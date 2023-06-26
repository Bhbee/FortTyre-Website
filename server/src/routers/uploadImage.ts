import multer from 'multer'
import express, { Request, Response } from 'express'
import { verifyUser } from '../middleware/verifyUserAuthencity'

export const uploadRouter = express.Router()
// LOCAL UPLOAD
const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}.jpg`)
    },
  })
  
  const uploadLocal = multer({ storage })
  
  uploadRouter.post('/', verifyUser, uploadLocal.single('image'),
    (req: Request, res: Response) => {
      if (!req.file) throw Error('req.file is null')
      res.send({
        secure_url: `/${req.file.path}`,
      })
    }
)