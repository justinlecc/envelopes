package main

import (
    "log"
    "database/sql"
)

type AppStore struct {
    Tx *sql.Tx
}

func CreateAppStore (tx *sql.Tx) *AppStore {
    return &AppStore{Tx: tx}
}

func (appStore *AppStore) Commit () {
    appStore.Tx.Commit()
}

func (appStore *AppStore) Rollback () {
    appStore.Tx.Rollback()
}

type Account struct {
  Id int
  Amount int
  Name string
}

type Envelope struct {
    Id int
    Name string
    Amount int
    OwnerId int
}

func (appStore *AppStore) GetEnvelope(envelopeId int) (Envelope, error) {

    var err error
    var envelope Envelope
    var sqlString string = `
        SELECT id, name, amount, owner_id
        FROM envelopes
        WHERE id=$1
    `
    err = appStore.Tx.QueryRow(sqlString, envelopeId).Scan(
        &envelope.Id, 
        &envelope.Name, 
        &envelope.Amount, 
        &envelope.OwnerId,
    )
    if err != nil {
        log.Print("ERROR: API::PutEnvelopeHandler failed to update the envelope")
        return envelope, err
    }

    return envelope, nil
}

func (appStore *AppStore) UpsertEnvelope(envelopeId int, envelopeName string, envelopeAmount int) error {

    var err error
    var sqlString string = `
        UPDATE envelopes
        SET name=$2, amount=$3
        WHERE id=$1
    `
    _, err = appStore.Tx.Exec(sqlString, envelopeId, envelopeName, envelopeAmount);
    if err != nil {
        log.Print("ERROR: API::PutEnvelopeHandler failed to update the envelope")
        return err
    }

    return nil
}
