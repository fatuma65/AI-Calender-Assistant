import {googleUser} from '../services/googleCalendar'
import {Request, Response} from 'express'
import { google } from 'googleapis'

const gmail = google.gmail({version: 'v1', auth: googleUser})

const authUrl = googleUser.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly']
})
console.log(authUrl);
export const listAllGmailMessages = async () => {
    try {
        const response = await gmail.users.messages.list({
            userId: 'me',
            maxResults: 20
        })

        const emails = response.data.messages ||[]
        console.log(emails);
    } catch (error) {
        console.log(error)
    }
}
listAllGmailMessages()
