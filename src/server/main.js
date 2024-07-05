import express from 'express'
import cors from 'cors'
import { getPost, createPost, updateLike, deletePost } from './models/likeme.models.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.get('/', (_, res) => res.status(200).send('Conneción con db Post'))

app.get('/posts', async (_, res) => {
  try {
    const posts = await getPost()
    res.status(200).send(posts)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.post('/posts', async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body
    await createPost(titulo, url, descripcion)
    res.status(201).send('Post creado con exito')
  } catch (error) {
    res.status(400).send(error)
  }
})

app.put('/posts/like/:id', async (req, res) => {
  try {
    const { id } = req.params
    await updateLike(id)
    res.status(200).send('Like actualizado')
  } catch (error) {
    res.status(500).send(error)
  }
})

app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params
    await deletePost(id)
    res.status(200).send('Post eliminado')
  } catch (error) {
    res.status(500).send('No se encontró el dato', error)
  }
})

app.all('*', (_, res) => res.status(404).send('Page no found'))

app.listen(PORT, () => console.log(`Server inciado en el puerto ${PORT}`))
