package main

import (
    "log"
    "github.com/labstack/echo"
    "net/http"
    "database/sql"
    "io/ioutil"
    "encoding/json"
    "reflect"
    "fmt"
)


func (api *API) GetEnvelopesHandler(c echo.Context) error {

  var err error
  var rows *sql.Rows
  var envelopeId int
  var name string
  var amount int
  envelopes := make(map[int]Envelope)

  rows, err = db.Query(`SELECT id, name, amount FROM envelopes`)
  if err != nil {
    log.Print("ERROR: API::EnvelopesHandler failed to query envelopes", err.Error())
    return c.JSON(500, "ERROR")
  }

  defer rows.Close()
  
  for rows.Next() {
    err = rows.Scan(&envelopeId, &name, &amount)
    if err != nil {
      log.Print("ERROR: API::EnvelopesHandler failed to scan the envelopes", err.Error())
      return c.JSON(500, "ERROR")
    }
    envelopes[envelopeId] = Envelope{Id: envelopeId, Name: name, Amount: amount}
  }

  return c.JSON(200, envelopes)
}

func (api *API) GetAccountsHandler(c echo.Context) error {

  var err error
  var rows *sql.Rows
  var accountId int
  var name string
  var amount int
  var accounts []Account

  rows, err = db.Query(`SELECT id, name, amount FROM accounts`)
  if err != nil {
    log.Print("ERROR: API::AccountsHandler failed to query accounts", err.Error())
    return c.JSON(500, "ERROR")
  }

  defer rows.Close()
  
  for rows.Next() {
    err = rows.Scan(&accountId, &name, &amount)
    if err != nil {
      log.Print("ERROR: API::AccountsHandler failed to scan the accounts", err.Error())
      return c.JSON(500, "ERROR")
    }
    accounts = append(accounts, Account{Id: accountId, Name: name, Amount: amount})
  }

  return c.JSON(200, accounts)
}

func (api *API) PutEnvelopeHandler(c echo.Context) error {

  var envelope Envelope
  var envelopeId int
  var envelopeIdFloat float64
  var envelopeName string
  var envelopeAmountFloat float64
  var envelopeAmount int
  var err error
  var ok bool
  requestData := make(map[string]interface{})
  response := make(map[string]interface{})
  var tx *sql.Tx

  tx, err = db.Begin()
  appStore := CreateAppStore(tx)

  defer appStore.Rollback()

  err = api.readRequestData(c.Request(), &requestData)
  if err != nil {
    log.Print(err.Error())
    response["ok"] = false
    response["error"] = "Request body was malformed."
    return c.JSON(500, response)
  }

  
  fmt.Println(reflect.TypeOf(requestData["Id"]))
  envelopeIdFloat, ok = requestData["Id"].(float64)
  if !ok {
    log.Print("ERROR: API::PutEnvelopeHandler failed to cast the envelopeId", requestData)
    response["ok"] = false
    response["error"] = "Request body was malformed."
    return c.JSON(500, response)
  }

  envelopeId = int(envelopeIdFloat)

  envelopeName, ok = requestData["Name"].(string)
  if !ok {
    log.Print("ERROR: API::PutEnvelopeHandler failed to cast the envelopeName", requestData)
    response["ok"] = false
    response["error"] = "Request body was malformed."
    return c.JSON(500, response)
  }

  envelopeAmountFloat, ok = requestData["Amount"].(float64)
  if !ok {
    log.Print("ERROR: API::PutEnvelopeHandler failed to cast the envelopeAmount", requestData)
    response["ok"] = false
    response["error"] = "Request body was malformed."
    return c.JSON(500, response)
  }

  envelopeAmount = int(envelopeAmountFloat)
 
  err = appStore.UpsertEnvelope(envelopeId, envelopeName, envelopeAmount)
  if err != nil {
    log.Print(err.Error())
    response["ok"] = false
    response["error"] = "Request failed to update the database."
    return c.JSON(500, response)
  }

  envelope, err = appStore.GetEnvelope(envelopeId)
  if err != nil {
    log.Print(err.Error())
    response["ok"] = false
    response["error"] = "Request failed to query the envelope from the database."
    return c.JSON(500, response)
  }

  appStore.Commit()

  response["ok"] = true
  response["data"] = envelope

  return c.JSON(200, response)

}

// Read a request's data into the reqData structure
func (api *API) readRequestData(req *http.Request, reqData interface{}) error {

  body, err := ioutil.ReadAll(req.Body)
  if err != nil {
    log.Print("ERROR: readRequestData failed to read the request body")
    return err
  }

  if len(body) > 0 {
    err = json.Unmarshal(body, &reqData)
    if err != nil {
      log.Print("ERROR: readRequestData failed to unmarshal the data into the reqData param")
      return err
    }
  }

  return nil

} 