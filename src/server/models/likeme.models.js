<<<<<<< HEAD
import pool from '../database/db_connect.js'

const getPost = async () => {
  try {
    const query = 'SELECT * FROM posts;'
    const { rows } = await pool.query(query)
    return rows
  } catch (error) {
    throw new Error(`Error al obtener los posts: ${error.message}`)
  }
}

const createPost = async ({ titulo, url, descripcion, likes = 0 }) => {
  try {
    const query =
      'INSERT INTO posts (titulo,img,descripcion,likes) VALUES ($1,$2,$3,$4) RETURNING *'
    const values = [titulo, url, descripcion, likes]
    const { rows } = await pool.query(query, values)
    return rows
  } catch (error) {
    console.log(error)
    throw new Error(`Error al crear el posts: ${error.message}`)
  }
}

export { getPost, createPost }
=======
import db from '../database/db_connect.js'

export const getPost = async () => await db('SELECT * FROM posts ORDER BY id ASC;')

export const createPost = async (titulo, url, descripcion, likes = 0) => {
  if (titulo === undefined || url === undefined || descripcion === undefined) {
    await db('INSERT INTO posts (titulo,img,descripcion,likes) VALUES ($1,$2,$3,$4) RETURNING *;', [titulo, url, descripcion, likes])
  } else {
    console.log('No puede existir espacios en blanco, favor completar')
  }
}

export const updateLike = async (id) => await db('UPDATE posts SET likes = likes +1 WHERE id = $1 RETURNING *;', [id])

export const deletePost = async (id) => await db('DELETE FROM posts WHERE id = $1 RETURNING *;', [id])
>>>>>>> feature/test
