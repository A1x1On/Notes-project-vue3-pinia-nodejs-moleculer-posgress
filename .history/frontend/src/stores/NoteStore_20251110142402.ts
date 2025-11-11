import { defineStore } from 'pinia'
import { sendToSentry } from '@/plugins/sentry'

import { type IClientRateResultItem } from '@/entities/pages/clientRate'

import EmailService from '@/services/EmailService'
import { type IClientEmail } from '@/entities/email'

export const useMailStore = defineStore('mailStore', () => {
  const isLoading = ref<boolean>(false)
  const data = ref<IClientEmail[]>([])

  const fetch = async (clientIds: string[]) => {
    isLoading.value = true

    try {
      const resp = await EmailService.fetch(clientIds)
      data.value = resp.data
    } catch (error) {
      throw sendToSentry(error)
    } finally {
      isLoading.value = false
    }
  }

  const getEmailTable = (rates: IClientRateResultItem[], doNotIncludeOldRates: number) => {
    let table =
      '<style>#t7 { width: 100%; }#t7 tbody {margin: 0;padding: 0;border: 0;outline: 0;font-size: 100%;vertical-align: baseline;' +
      'background: transparent;}#t7 thead { text-align: left; }#t7 thead th {text-align: left;background-color: lightgray;color: #444;' +
      'font-size: 16px;font-weight: bold;padding: 3px 20px;}#t7 th { background-color: darkblue;color: white;font-size: 16px;' +
      'font-weight: bold;padding: 3px 20px;vertical-align: middle !important;}' +
      '#t7 td { padding: 3px 20px; }#t7 tr:nth-child(even) { background: #F2F2F2}' +
      '</style>'
    table +=
      "<table id='t7'><tr><th style='width: 150px; text-align: left;'>Country</th><th style='width: 200px;" +
      " text-align: left;'>Operator</th><th style='width: 40px;'>MCC</th><th style='width: 40px;'>MNC</th>" +
      "<th style='width: 90px;'>New Rate</th>"

    table += doNotIncludeOldRates !== 1 ? "<th style='width:90px;'>Old Rate</th>" : ''

    table += "<th style='width:100px;'>Valid From (GMT)</th></tr>"

    rates.forEach((rate) => {
      if (doNotIncludeOldRates !== 1) {
        table +=
          '<tr><td>' +
          rate.country +
          '</td><td>' +
          rate.operator +
          "</td><td style='text-align: center;'>" +
          rate.mcc +
          "</td><td style='text-align: center;'>" +
          rate.mnc +
          "</td><td style='color: green; text-align: center;'>" +
          rate.rate.toFixed(5) +
          "</td><td style='color: red; text-align: center;'>" +
          (rate.old_price !== null ? rate.old_price.toFixed(5) : '') +
          "</td><td style='text-align: center;'>" +
          rate.effective_date +
          '</td></tr>'
      } else {
        table +=
          '<tr><td>' +
          rate.country +
          '</td><td>' +
          rate.operator +
          "</td><td style='text-align: center;'>" +
          rate.mcc +
          "</td><td style='text-align: center;'>" +
          rate.mnc +
          "</td><td style='color: green; text-align: center;'>" +
          rate.rate.toFixed(5) +
          "</td><td style='text-align: center;'>" +
          rate.effective_date +
          '</td></tr>'
      }
    })

    table += '</table>'

    return table
  }

  return {
    isLoading,
    data,

    fetch,
    getEmailTable,
  }
})
