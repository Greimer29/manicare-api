import type { HttpContext } from '@adonisjs/core/http'
import admin from 'firebase-admin'

const serviceAccount = {
  type: 'service_account',
  project_id: 'nails-app-1c7fa',
  private_key_id: '12969dbef74a5c6735957a6e8046eae1f7746b52',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC/zhCN8Xjevpy7\nTDtLCOquK6uIePkowT7DlJrkkSkLUuse2hfoajbN2Bdl8a3D6AEKTfl2WnB5/fGK\nAuBtW42ISmPgcGPmdnFyDh+FNVGQapvRH1Yx389skxBlNGoowkTNPXa4W95E4Qc9\nr2XqPMu3pXD5l0XWJ8rm35unwhHeVsffLw6NY0t78e/xWmoAAM6eh/vg07UDuzb3\n0pNrnOFMdM0JoyEcLoKaFf0TAmdrZgKi0vjgXSNABFWW/lpcafWtmeKWyN8CE16i\nFghaDj9iJQPz1J7ONkm+tAG4NdRuNqY7E95zd19/IQu/CzjencbuU3B27dT8ROEH\nsZxRHdMzAgMBAAECggEADaNSM9DAvOnSjOv7M7cjF+MWbWI/D4hKDuMKoaG2rudX\nvRfzZwmvJhmTp4jn+svzNi91w1YXG3164ErORWHv1HCIEH9wgwSjki4Lf+la7tW9\nu/PD9h2vvhmCd9SI9dpcxQRcfcUk4g+A3poRn5AKFix6NeA6ALCDC1tIuJFvVThr\n4voCDjKUOUZnmtTKMr+8H8hYSUGvacw9tAIAI2FGdSQlBecj34NC8kETAsJPzeUG\n5szQh8J0zS95dzu8Qie0xu6oPGOHUa3hWt08ghCHrsFCWLJ1b2JogL68k+JZmL4b\nsqPCOveMs7Apc0JToH5jxM0HrOCvX3hhi6m39mykVQKBgQDnGy72GnD4u4w1P+Du\nOvue7D7mSRIkPha6Fq1RA+BawLLTPxKYKDCRYMdw6Rfj8my5S9hhij5/1s0gqzo6\ngFAeWcLpnK7Ruw6yazju4HJQLMxB2Kfd5v7kwtURX56hP2CO6cXQZmPNgMNctGGq\nSfTERrvifvWUM8TdktiRwL8G5wKBgQDUdyN6gWHPkguu97//rR2NYRL5Kx1bBz69\nQ0HJGa/dtpeBjdFHgQSw1kmgibgYNq4IxWPU+K8UjnmgxFfpD5K7uDq3stK+U8qF\nLeSZk502O0RAD+mY1d1uP7ArftBq7Bfi/NeKl2W9sDLIEG/9TJlDFcX402aGYS1t\nF4z1N/ij1QKBgAFCR6Y1jKn+M4xStcH2dkpuVQViHoQuBmerGfSYBc/YvuChtlM3\n3NPd6Bg4XNX0Cx2TSTF21FJT9DgaVq3c5xLTQFmPbfBciX71UJEUjerb45z0Ni3i\nRT8vxINctvt/4eHFajtxY1fKPMYzgVixIHE1RW69bE8LXSYr15wrpZ6/AoGAOrK3\nkI7SMQCOTcaQuthfA8I/9ardr1pvEObV8/MuzTg230oI+ZJBc4GgUcP6omXo6u9t\nx1b1N96s56eXCgKNbWNWhY3X/1Ey8FxffbZ0hpkVIAXFab4cMOtThpDAj+muJ73m\n5pkxOJjHTtKLvhU9enU3fqkY+CM845jQDqdqAAkCgYAc1YNUxRqCRktJvMt0auHJ\n8eUcYewViWFHDR3lVGf6sjn3rC2pWikG9R794K4aZB2TRBYK/gJtxjFyIlN3hiXo\ny8xWhxjWW3RPPeaOLIG8m5tfTd/mkzVepMXyDiPWyrJKeQFgZ7Ku0i8hLLMxMXGU\nj/oEQkjJjwG6iUqltMhZtQ==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-h7ao3@nails-app-1c7fa.iam.gserviceaccount.com',
  client_id: '116824521376415607444',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-h7ao3%40nails-app-1c7fa.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
}

export default class ReservationsController {
  async sendMessage(message: any) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount))),
      })
    }

    admin
      .messaging()
      .send(message)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async create({ request, response }: HttpContext) {
    const { message } = request.body()

    if (message) {
      try {
        this.sendMessage(message)
        response.status(200).json('Successfully sent message')
      } catch (error) {
        response.status(400).json('Error sending message:', error)
      }
    }
  }
}
