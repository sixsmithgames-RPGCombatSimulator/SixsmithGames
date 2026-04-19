import type { AppSlug } from '@/lib/subscription';

export type PostContentType = 'article' | 'news';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
  contentType?: PostContentType;
  relatedProducts: AppSlug[];
}
