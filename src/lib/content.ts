import { getCollection } from 'astro:content';
export async function publishedPosts() {
  return (await getCollection('posts', ({ data }) => data.published)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export async function publishedProjects() {
  return (await getCollection('projects', ({ data }) => data.published)).sort((a, b) => a.data.order - b.data.order);
}
export const dateLabel = (date: Date) => new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
