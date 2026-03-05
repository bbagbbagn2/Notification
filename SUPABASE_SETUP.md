# Supabase Setup Guide

## Required Schema Changes

### 1. Add `views` column to `posts` table

```sql
ALTER TABLE posts ADD COLUMN views INTEGER DEFAULT 0;
```

### 2. Create `likes` table

```sql
CREATE TABLE likes (
  id BIGSERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Add index for performance
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
```

### 3. Create `increment_views` RPC function

```sql
CREATE OR REPLACE FUNCTION increment_views(post_id_param INTEGER)
RETURNS INTEGER AS $$
DECLARE
  view_count INTEGER;
BEGIN
  UPDATE posts
  SET views = views + 1
  WHERE id = post_id_param
  RETURNING views INTO view_count;
  
  RETURN view_count;
END;
$$ LANGUAGE plpgsql;
```

## Steps to Execute

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy each SQL statement above and run them
5. Verify that the table and function are created successfully

## Environment Variables

Make sure your `.env.local` file contains:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing

After setup, you can test the engagement features:

1. Visit a post page to test view counting
2. Try liking/unliking a post if authenticated
3. Check the `likes` table and post `views` in Supabase dashboard
