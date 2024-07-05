import db from '../database/db_connect.js'

export const getPost = async () => await db('SELECT * FROM posts ORDER BY id ASC;')

export const createPost = async (titulo, url, descripcion, likes = 0) =>
  await db('INSERT INTO posts (titulo,img,descripcion,likes) VALUES ($1,$2,$3,$4) RETURNING *;', [titulo, url, descripcion, likes])

export const updateLike = async (id) => await db('UPDATE posts SET likes = likes +1 WHERE id = $1 RETURNING *;', [id])

export const deletePost = async (id) => await db('DELETE FROM posts WHERE id = $1 RETURNING *;', [id])
