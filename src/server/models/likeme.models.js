import db from '../database/db_connect.js'

export const getPost = async () => await db('SELECT * FROM posts;')

export const createPost = async (titulo, url, descripcion, likes) =>
  await db('INSERT INTO posts (titulo,img,descripcion,likes) VALUES ($1,$2,$3,$4) RETURNING *;', [titulo, url, descripcion, likes])
