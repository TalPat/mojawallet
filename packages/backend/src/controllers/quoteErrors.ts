import { AccountsAppContext } from '../index'
import { ErrorQuoteResponseTool } from '../services/quoteResponse-service'

export async function store (ctx: AccountsAppContext): Promise<void> {
  const { logger, quotesResponse } = ctx
  const { id } = ctx.params
  const { body } = ctx.request
  console.log('QUOTE ERRORS', id, body)
  const errorQuoteResponseTool = new ErrorQuoteResponseTool(body, id)
  try {
    await quotesResponse.storeError(errorQuoteResponseTool.getQuoteResponseProps())
    logger.info('Received Quote Error Response', { quoteId: id, body })
  } catch (error) {
    logger.error('Unable to store quote response', error)
  }
  ctx.status = 200
}
