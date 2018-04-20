package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	//"github.com/itsjamie/gin-cors"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "false")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
func main() {
	router := gin.Default()
	router.Use(CORSMiddleware())
	// router.Use(cors.Middleware(cors.Config{
	// 	Origins:         "http://localhost:4200/",
	// 	Methods:         "GET, PUT, POST, DELETE",
	// 	RequestHeaders:  "Origin, Authorization, Content-Type",
	// 	ExposedHeaders:  "",
	// 	MaxAge:          50 * time.Second,
	// 	Credentials:     false,
	// 	ValidateHeaders: false,
	// }))
	// v1 := router.Group("/contacts")
	// {
	// 	v1.POST("/", createContact)
	// 	v1.GET("", fetchAllContacts)
	// 	v1.GET("/:id", fetchSingleContact)
	// 	//v1.PUT("/:id", updateContact)
	// 	//v1.DELETE("/:id", deleteContact)
	// }
	router.GET("/api/v1/contacts", fetchAllContacts)
	router.POST("/api/v1/contacts", createContact)
	router.PUT("/api/v1/contacts", updateContact)
	router.DELETE("/api/v1/contacts/:id", deleteContact)

	router.GET("/api/v1/contacts/:id/emails", fetchAllEmails)
	router.PUT("/api/v1/contacts/:id/emails", updateEmail)
	router.POST("/api/v1/contacts/:id/emails", addEmail)
	router.DELETE("/api/v1/contacts/:id/emails/:eid", deleteEmail)
	router.Run(":3000")
}

func init() {
	//open a db connection
	var err error
	db, err = gorm.Open("postgres", "host=localhost port=5432 user=user dbname=user password=password sslmode=disable")

	if err != nil {
		panic(err)
	} //Migrate the schema
	//db.AutoMigrate(&Contact{})

}

type Contact struct {
	ID          int    `json:"id" gorm:"primary_key"`
	Firstname   string `json:"firstName"`
	Lastname    string `json:"lastName"`
	Phonenumber string `json:"phoneNumber"`
}

type Email struct {
	Id        int    `json:"id" gorm:"primary_key"`
	Contactid int    `json:"contactId"`
	Emailid   string `json:"emailId"`
}

func fetchAllContacts(c *gin.Context) {
	var contacts []Contact
	db.Find(&contacts)
	if len(contacts) <= 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "No Contacts found!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": contacts})
}

func updateContact(c *gin.Context) {
	var contact Contact
	if err := c.BindJSON(&contact); err == nil {
		db.Save(&contact)
		c.JSON(http.StatusOK, gin.H{"status": http.StatusOK})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func createContact(c *gin.Context) {
	var contact Contact
	if err := c.BindJSON(&contact); err == nil {
		var inserted = db.Create(&contact)
		if inserted.Error == nil {
			c.JSON(http.StatusCreated, gin.H{"status": http.StatusCreated,
				"RowsInserted": inserted.RowsAffected, "Details": inserted.Value})
		} else {
			c.JSON(http.StatusNotModified, gin.H{"status": http.StatusNotModified,
				"RowsInserted": 0, "Details": inserted})
		}

	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func deleteContact(c *gin.Context) {
	var contact Contact
	if id, err := strconv.Atoi(c.Param("id")); err == nil {
		contact.ID = id
		deleted := db.Delete(&contact)
		fmt.Println(deleted)
		c.JSON(http.StatusOK, gin.H{"status": http.StatusOK})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func fetchAllEmails(c *gin.Context) {
	var emails []Email

	if id, err := strconv.Atoi(c.Param("id")); err == nil {
		//fmt.Println(id)
		db.Where("contactid = ?", id).Find(&emails)
		if len(emails) <= 0 {
			c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "No Existing Emails"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": emails})

	}

}

func updateEmail(c *gin.Context) {
	var email Email
	if err := c.BindJSON(&email); err == nil {
		//fmt.Println(email)
		db.Save(&email)
		c.JSON(http.StatusOK, gin.H{"status": http.StatusOK})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func addEmail(c *gin.Context) {
	var email Email
	if err := c.BindJSON(&email); err == nil {
		var inserted = db.Create(&email)
		if inserted.Error == nil {
			c.JSON(http.StatusCreated, gin.H{"status": http.StatusCreated,
				"RowsInserted": inserted.RowsAffected, "Details": inserted.Value})
		} else {
			c.JSON(http.StatusNotModified, gin.H{"status": http.StatusNotModified,
				"RowsInserted": 0, "Details": inserted})
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func deleteEmail(c *gin.Context) {
	var email Email
	if id, err := strconv.Atoi(c.Param("eid")); err == nil {
		email.Id = id
		deleted := db.Delete(&email)
		fmt.Println(deleted)
		c.JSON(http.StatusOK, gin.H{"status": http.StatusOK})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}
