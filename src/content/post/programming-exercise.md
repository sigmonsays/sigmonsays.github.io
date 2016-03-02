+++
date = "2016-03-02T14:57:19-08:00"
draft = false
title = "programming exercise"

+++

I heard from a friend about an interesting interview question that I thought would be easy. 

*The problem*

the goal of this program is to find the shortest number of stickers used to make a another word given that you have thousands of stickers

for instance, with the word "WPENGINE" printed on them to make for example "WWW" would take 3 and another example is "WINE" would take 2.


The code


      package main

      import (
         "fmt"
         "os"
         "strings"
      )

      func NewSticker(word string) *Sticker {
         s := &Sticker{
            letters: make(map[rune]int, 0),
         }
         var v int
         for _, w := range strings.ToLower(word) {
            v, _ = s.letters[w]
            v += 1
            s.letters[w] = v
         }
         return s
      }

      type Sticker struct {
         letters map[rune]int
      }

      func (s *Sticker) HasLetter(l rune) bool {
         count, found := s.letters[l]
         if found == false {
            return false
         }
         if count > 0 {
            return true
         }
         return false
      }

      func (s *Sticker) Desc() string {
         a := make([]string, 0)
         for l, cnt := range s.letters {
            a = append(a, fmt.Sprintf("%s=%d", string(l), cnt))
         }
         return strings.Join(a, " ")
      }

      func (s *Sticker) UseLetter(l rune) error {

         fmt.Printf("using letter %s\n", string(l))

         count, found := s.letters[l]
         if found == false {
            return fmt.Errorf("sticker doesn't have letter %s", l)
         }

         if count == 0 {
            return fmt.Errorf("letter is used up")
         }

         count--
         s.letters[l] = count
         return nil

      }

      type Pile struct {
         word     string
         stickers []*Sticker
      }

      func NewPile(word string) *Pile {
         p := &Pile{
            word:     word,
            stickers: make([]*Sticker, 0),
         }
         return p
      }

      func (p *Pile) HasLetter(l rune) bool {
         for _, sticker := range p.stickers {
            if sticker.HasLetter(l) {
               return true
            }
         }
         return false
      }

      func (p *Pile) AddSticker() {
         p.stickers = append(p.stickers, NewSticker(p.word))
      }

      func main() {

         var err error
         sticker_word := "WPENGINE"

         word := "pingping"
         if len(os.Args) > 1 {
            word = os.Args[1]
         }
         fmt.Printf("sticker word %s\n", sticker_word)
         fmt.Printf("making word %s\n", word)
         pile := NewPile(sticker_word)

         // just to validate we have the letters..
         sticker := NewSticker(sticker_word)

         for _, l := range word {
            //s := string(l)
            fmt.Printf("letter %s\n", string(l))

            if sticker.HasLetter(l) == false {
               err = fmt.Errorf("no letter %s", string(l))
               break
            }

            if pile.HasLetter(l) == false {
               pile.AddSticker()
            }

            // find a sticker that has the letter we're lookin for in the pile
            for _, sticker := range pile.stickers {
               if sticker.HasLetter(l) {
                  sticker.UseLetter(l)
                  continue
               }
            }

         }

         if err != nil {
            fmt.Printf("ERROR: %s\n", err)
            return
         }

         // print the results

         used := len(pile.stickers)
         fmt.Printf("stickers used %d\n", used)

         for i, sticker := range pile.stickers {
            fmt.Printf("sticker #%d  letters %+v\n", i+1, sticker.Desc())
         }

      }


