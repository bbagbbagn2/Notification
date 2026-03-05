/**
 * 게시물 조회수 & 좋아요 관리
 */

import { supabase } from '@/lib/supabase';
import { Like, Post } from '@/types';

// ============================================
// 조회수 (Views)
// ============================================

/**
 * 글 조회수 증가
 */
export async function incrementViews(postId: string): Promise<void> {
  try {
    const { error } = await supabase.rpc('increment_views', {
      post_id: postId,
    });

    if (error) {
      console.error('Error incrementing views:', error);
    }
  } catch (error) {
    console.error('Error in incrementViews:', error);
  }
}

/**
 * 글의 현재 조회수 조회
 */
export async function getPostViews(postId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('views')
      .eq('id', postId)
      .single();

    if (error) {
      console.error('Error fetching views:', error);
      return 0;
    }

    return data?.views || 0;
  } catch (error) {
    console.error('Error in getPostViews:', error);
    return 0;
  }
}

// ============================================
// 좋아요 (Likes)
// ============================================

/**
 * 사용자의 좋아요 토글
 */
export async function toggleLike(
  postId: string,
  userId: string,
): Promise<boolean> {
  try {
    // 기존 좋아요 확인
    const { data: existingLike, error: fetchError } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (fetchError) {
      console.error('Error checking existing like:', fetchError);
      throw fetchError;
    }

    if (existingLike) {
      // 좋아요 취소
      const { error: deleteError } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);

      if (deleteError) throw deleteError;
      return false;
    } else {
      // 좋아요 추가
      const { error: insertError } = await supabase
        .from('likes')
        .insert([{ post_id: postId, user_id: userId }]);

      if (insertError) throw insertError;
      return true;
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
}

/**
 * 글의 좋아요 개수 조회
 */
export async function getLikesCount(postId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId);

    if (error) {
      console.error('Error fetching likes count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error in getLikesCount:', error);
    return 0;
  }
}

/**
 * 사용자가 글에 좋아요를 눌렀는지 확인
 */
export async function isPostLikedByUser(
  postId: string,
  userId: string,
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error checking if post is liked:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in isPostLikedByUser:', error);
    return false;
  }
}

/**
 * 글의 전체 좋아요 리스트 조회 (관리자용)
 */
export async function getPostLikes(postId: string): Promise<Like[]> {
  try {
    const { data, error } = await supabase
      .from('likes')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching post likes:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getPostLikes:', error);
    return [];
  }
}

/**
 * 사용자의 모든 좋아요 조회
 */
export async function getUserLikes(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('likes')
      .select('post_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user likes:', error);
      return [];
    }

    return data?.map((like) => like.post_id) || [];
  } catch (error) {
    console.error('Error in getUserLikes:', error);
    return [];
  }
}
