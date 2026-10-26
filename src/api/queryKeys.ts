// Central registry of React Query keys.
// Values are identical to the keys the components used before this refactor,
// so cache sharing and prefix invalidation behave exactly as before.
// `...All` keys are prefixes used with invalidateQueries.
export const queryKeys = {
  posts: ['newposts'] as const,

  postDetailsAll: ['postdetails'] as const,
  postDetails: (id: string | undefined) => ['postdetails', id] as const,

  userPostsAll: ['userposts'] as const,
  userPosts: (userId: string | undefined) => ['userposts', userId] as const,

  bookmarks: ['bookmarks'] as const,

  // Not used by any useQuery yet: post comments are fetched imperatively in PostFooter.
  comments: (postId: string) => ['comments', postId] as const,
  replies: (commentId: string) => ['replies', commentId] as const,

  // Prefix of unreadCount too, so invalidating `notifications` also refreshes the badge.
  notifications: ['notifications'] as const,
  unreadCount: ['notifications', 'unread-count'] as const,

  // Same /users/suggestions endpoint, two keys (widget vs. full infinite list).
  suggestionsAll: ['friends'] as const,
  suggestions: (search: string) => ['friends', search] as const,
  allSuggestions: (search: string) => ['friends', 'all', search] as const,

  profile: (userId: string | undefined) => ['userProfile', userId] as const,
}
