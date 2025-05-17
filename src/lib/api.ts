const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE_URL}/users`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return res.json();
}

export async function getUser(id: string | number): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }
  
  return res.json();
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return res.json();
}

export async function getPost(id: string | number): Promise<Post> {
  const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  
  return res.json();
}

export async function getUserPosts(userId: string | number): Promise<Post[]> {
  const res = await fetch(`${API_BASE_URL}/users/${userId}/posts`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch user posts');
  }
  
  return res.json();
}

export async function getPostComments(postId: string | number): Promise<Comment[]> {
  const res = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch post comments');
  }
  
  return res.json();
}

export async function getStats() {
  const [users, posts, comments] = await Promise.all([
    fetch(`${API_BASE_URL}/users`).then(res => res.json()),
    fetch(`${API_BASE_URL}/posts`).then(res => res.json()),
    fetch(`${API_BASE_URL}/comments`).then(res => res.json())
  ]);

  return {
    users: users.length,
    posts: posts.length,
    comments: comments.length
  };
} 