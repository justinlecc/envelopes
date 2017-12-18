package main

import (
  "github.com/labstack/echo"
  "database/sql"
  // "database/sql/driver"
  _ "github.com/lib/pq"
  "log"
  // "net/http"
  // "io/ioutil"
  // "encoding/json"
  // "strconv"
  // "fmt"
)

// API is a defined as struct bundle
// for api. Feel free to organize
// your app as you wish.
type API struct{}

var db *sql.DB

// Bind attaches api routes
func (api *API) Bind(group *echo.Group) {
  var err error
  var connStr string

  connStr = "postgresql://envelopesapp:makemoney@localhost:5432/envelopes?sslmode=disable" // remove sslmode for prod
  db, err = sql.Open("postgres", connStr)
  if err != nil {
    log.Fatal(err)
  }

  group.GET("/v1/conf", api.ConfHandler)
  group.GET("/v1/envelopes", api.GetEnvelopesHandler)
  group.GET("/v1/accounts", api.GetAccountsHandler)
  group.PUT("/v1/envelope", api.PutEnvelopeHandler)
}

// ConfHandler handle the app config, for example
func (api *API) ConfHandler(c echo.Context) error {
  app := c.Get("app").(*App)
  return c.JSON(200, app.Conf.Root)
}

// type ApiResponse struct {
//   ok bool
//   error string
//   data interface{}
// }


