import { S3Service } from "@ntegral/nestjs-s3"
import { randomUUID } from "crypto"
import { curry } from "ramda"


const generateImageName = curry((format: string, name: string) => `${name}.${format}`)
const getJpgImageName = generateImageName('jpeg')

const uploadConfig = curry((bucket: string, contentType: string, key: string) =>
({
    Bucket: bucket,
    ContentType: contentType,
    Key: key
}))

const bucketUploadConfig = uploadConfig("products-moart")
const imageUploadConfig = bucketUploadConfig("image/jpeg")

export async function genereateImageUrl(s3Service: S3Service) {
    await setUpCors(s3Service)
    const key = getJpgImageName(randomUUID())
    const url = s3Service.getSignedUrl('putObject', imageUploadConfig(key))
    return { key, url }
}


export async function deleteObject(objectName, s3Service: S3Service) {
    await setUpCors(s3Service)
    return new Promise((resolve, reject) => {
        s3Service.deleteObject({
            Bucket: 'products-moart',
            Key: objectName
        }, (err, data) => {
            if (err) reject(new Error(err.message))
            resolve(data);
        })

    })
}

const corsConfig = {
    Bucket: 'products-moart', // REQUIRED
    CORSConfiguration: {
        // REQUIRED
        CORSRules: [
            // REQUIRED
            {
                AllowedHeaders: ['*'],
                AllowedMethods: ['PUT'], // REQUIRED
                AllowedOrigins: ['http://localhost:3000', "https://moart-prod-client.herokuapp.com"], // REQUIRED
            },
        ],
    },
};

// set up cors access for the S3 Bucket
export function setUpCors(s3Service: S3Service) {
    return new Promise((resolve, reject) => {
        s3Service.putBucketCors(corsConfig, (err, data) => {
            if (err) {
                reject(new Error("unable to enable cors"))
            } else {
                console.log("cors setup for image upload completed")
                resolve(true);
            }
        })
    })
}



// SetObject Acl sets up the Access list for public reading of the
// object identified by the key


const aclConfig = curry((Bucket, ACL, Key) => ({ Bucket, ACL, Key }))
const productsAclConfig = aclConfig('products-moart')
const productpublicFileAclConfig = productsAclConfig('public-read')

export async function setObjectAcl(fileName: string, s3Service: S3Service) {

    await setUpCors(s3Service)
    return new Promise((resolve, reject) => {
        s3Service.putObjectAcl(productpublicFileAclConfig(fileName), (err, data) => {
            if (err) reject(new Error(err.message))
            resolve(data)
        })
    })
}
