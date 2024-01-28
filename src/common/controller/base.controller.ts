import { Res, Response } from "@nestjs/common"
import Meta from "src/common/dto/meta"

export default class BaseController {
    sendOK(code?: number) {
        return {
            'code': code ? code : 201,
            'status': "OK",
        }
    }

    sendData(data?: any, meta?: Meta) {
        return {
            'code': 200,
            'status': "OK",
            'data': data,
            meta: meta,
        }
    }
}