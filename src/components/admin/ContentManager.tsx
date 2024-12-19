import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Plus } from 'lucide-react';
import type { BlogPost, NewsItem } from '@/types/cms';

export const ContentManager = () => {
  const [activeTab, setActiveTab] = useState<'blog' | 'news'>('blog');
  
  const { data: blogPosts, isLoading: loadingBlog } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('publishedAt', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    }
  });

  const { data: newsItems, isLoading: loadingNews } = useQuery({
    queryKey: ['news-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_items')
        .select('*')
        .order('publishedAt', { ascending: false });
      
      if (error) throw error;
      return data as NewsItem[];
    }
  });

  const handleCreateContent = async (type: 'blog' | 'news') => {
    try {
      const table = type === 'blog' ? 'blog_posts' : 'news_items';
      const { error } = await supabase.from(table).insert({
        title: 'New Draft',
        content: '',
        published: false,
        publishedAt: new Date().toISOString(),
        ...(type === 'blog' ? { 
          author: 'Admin',
          tags: [],
          slug: `draft-${Date.now()}`
        } : {
          priority: 'low'
        })
      });

      if (error) throw error;
      toast.success(`New ${type} post created`);
    } catch (error) {
      console.error('Error creating content:', error);
      toast.error('Failed to create content');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'blog' | 'news')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage your blog content here</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingBlog ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {blogPosts?.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded">
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => toast.info('Edit functionality coming soon')}>
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleCreateContent('blog')} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> New Blog Post
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle>News Items</CardTitle>
              <CardDescription>Manage your news content here</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingNews ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {newsItems?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          Priority: {item.priority}
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => toast.info('Edit functionality coming soon')}>
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleCreateContent('news')} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> New News Item
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};