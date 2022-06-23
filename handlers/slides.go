package handlers

import (
	"context"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"
	"google.golang.org/api/slides/v1"
)

func GetSlide(c *gin.Context) {
	ctx := context.Background()

	client := conf.Client(context.Background(), token)

	srv, err := slides.NewService(ctx, option.WithHTTPClient(client))
	if err != nil {
		log.Fatalf("Unable to retrieve Slides client: %v", err)
	}

	presentationId := "1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc"
	presentation, err := srv.Presentations.Get(presentationId).Do()
	if err != nil {
		log.Fatalf("Unable to retrieve data from presentation: %v", err)
	}

	fmt.Printf("The presentation contains %d slides:\n", len(presentation.Slides))
	for i, slide := range presentation.Slides {
		fmt.Printf("- Slide #%d contains %d elements.\n", (i + 1),
			len(slide.PageElements))
	}

	fmt.Println(client)

}
