export interface Article {
  article_id: string,
  title: string | null,
  link: string | null,
  keywords: Array<string> | null,
  creator: Array<string> | null,
  description: string | null,
  content: string | null,
  pubDate: string | null,
  pubDateTZ: string | null,
  image_url: string | null,
  video_url: string | null,
  source_id: string | null,
  source_name: string | null,
  source_priority: number | null,
  source_url: string | null,
  source_icon: string | null,
  language: string | null,
  country: Array<string> | null,
  category: Array<string> | null,
  sentiment: string | null,
  sentiment_stats: Array<{
    positive: number,
    neural: number,
    negative: number,
  }> | null,
  ai_tag: Array<string> | null,
  ai_region: Array<string> | null,
  ai_org: Array<string> | null,
  duplicate: boolean | null,
}