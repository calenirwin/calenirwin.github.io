import functools
import json
import os
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / ".visual-evidence"
OUT.mkdir(exist_ok=True, parents=True)
server = ThreadingHTTPServer(
    ("127.0.0.1", 0),
    functools.partial(SimpleHTTPRequestHandler, directory=str(ROOT / "dist")),
)
threading.Thread(target=server.serve_forever, daemon=True).start()
BASE = f"http://127.0.0.1:{server.server_port}"
report = []
with sync_playwright() as p:
    b = p.chromium.launch(
        executable_path=os.environ.get("CHROMIUM") or None, args=["--no-sandbox"]
    )
    for w in [320, 390, 768, 1440]:
        page = b.new_page(viewport={"width": w, "height": 900 if w > 600 else 844})
        errors = []
        page.on("pageerror", lambda e, errors=errors: errors.append(str(e)))
        for route in [
            "",
            "blog/",
            "blog/building-this-portfolio-with-codex/",
            "projects/",
            "projects/hnefatafl/",
            "about/",
            "cv/",
        ]:
            page.goto(BASE + "/" + route)
            page.evaluate("document.fonts.ready")
            page.wait_for_timeout(300)
            assert page.evaluate(
                "document.documentElement.scrollWidth <= innerWidth"
            ), (w, route, "overflow")
            page.screenshot(
                path=str(
                    OUT / f"{route.strip('/').replace('/', '-') or 'home'}-{w}.png"
                ),
                full_page=True,
            )
        page.goto(BASE + "/projects/")
        link = page.locator("[data-project-dialog]").first
        link.focus()
        page.keyboard.press("Enter")
        dialog = page.locator("dialog[open]")
        assert dialog.count() == 1
        assert page.locator(".dialog-close").evaluate("(e)=>e===document.activeElement")
        page.keyboard.press("Shift+Tab")
        assert dialog.locator("a").last.evaluate("(e)=>e===document.activeElement")
        page.keyboard.press("Tab")
        assert page.locator(".dialog-close").evaluate("(e)=>e===document.activeElement")
        for _ in range(8):
            page.keyboard.press("Tab")
            assert page.evaluate("!!document.activeElement.closest('dialog')")
        assert dialog.locator('a[href="https://calenirwin.com/gym-hnef/"]').count() == 1
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        page.screenshot(path=str(OUT / f"project-dialog-{w}.png"), full_page=False)
        page.keyboard.press("Escape")
        assert page.locator("dialog[open]").count() == 0
        assert link.evaluate("(e)=>e===document.activeElement")
        link.click()
        page.locator(".dialog-close").click()
        assert link.evaluate("(e)=>e===document.activeElement")
        link.click()
        page.mouse.click(2, 2)
        assert page.locator("dialog[open]").count() == 0
        page.goto(BASE + "/")
        page.keyboard.press("Tab")
        page.keyboard.press("Enter")
        assert page.locator("#main").evaluate("(e)=>e===document.activeElement")
        page.emulate_media(reduced_motion="reduce")
        assert (
            page.locator(".hero h1").evaluate("(e)=>getComputedStyle(e).animationName")
            == "none"
        )
        assert not errors, errors
        report.append(
            {
                "width": w,
                "portfolio": "routes, overflow, skip focus, dialog keyboard wrap/Escape/close/backdrop/restore, verified links, reduced motion passed",
                "pageErrors": errors,
            }
        )
        page.close()
    page = b.new_page(java_script_enabled=False)
    page.goto(BASE + "/projects/")
    page.locator(".project-card").click()
    assert page.locator('a[href="https://calenirwin.com/gym-hnef/"]').count() == 1
    report.append({"noJavaScript": "project direct route and destination links passed"})
    b.close()
(OUT / "portfolio-qa.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps(report, indent=2))

server.shutdown()
