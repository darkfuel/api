import express from 'express'
import cors from 'cors'
import { getPost, createPost } from './models/likeme.models.js'
const app = express()
const PORT = process.env.PORT ?? 3000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Conneción con db Post')
})

app.get('/posts', async (req, res) => {
  try {
    const posts = await getPost()
    res.status(200).send(posts)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.post('/posts', async (req, res) => {
  try {
    await createPost(req.body)
    res.status(201).send('Post creado con exito')
  } catch (error) {
    res.status(400).send(error)
  }
})

app.listen(PORT, () => console.log(`Server inciado en el puerto ${PORT}`))
