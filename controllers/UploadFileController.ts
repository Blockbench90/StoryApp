import express from "express";
import cloudinary from "../core/cloudinary";


class UploadFileController {
    async upload(req: express.Request, res: express.Response): Promise<void> {

        //@ts-ignore
        const file = req.file;
        console.log('avatar сразу после добавления в server.ts =', file)
        cloudinary.v2.uploader
            .upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (error || !result) {
                    return res.status(500).json({
                        status: 'error',
                        message: error || 'upload error',
                    });
                }

                res.status(201).json({
                    url: result.url,
                    size: Math.round(result.bytes / 1024),
                    height: result.height,
                    width: result.width,
                });
            })
            .end(file.buffer);
    }

    async uploadAvatar(req: express.Request, res: express.Response): Promise<void> {
        //@ts-ignore
        const avatar = req.file;
        console.log('Попал в server, req.file =', avatar)
        cloudinary.v2.uploader
            .upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (error || !result) {
                    return res.status(500).json({
                        status: 'error',
                        message: error || 'upload error',
                    });
                }

                res.status(201).json({
                    url: result.url,
                    size: Math.round(result.bytes / 1024),
                    height: result.height,
                    width: result.width,
                });
            })
            .end(avatar.buffer);
    }
}

export const UploadFileCtrl = new UploadFileController();
