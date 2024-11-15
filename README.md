# Introduction to the I Ching

## Overview
This is an instance of the I Ching, an ancient Chinese classic used in divination and self-examination for thousands of years. This application can be used either as a means to cast I Ching readings, or just familiarizing oneself with the contents of the Book of Changes.

## Logic
This application is based on a variation of the coin tossing method for generating hexagrams. In the coin tossing method, one throws three coins six times; each throw constitutes a line which is either yin or yang, and these lines form one of the 64 hexagrams whose significances are described in the Book of Changes. 

Instead of casting each line individually, this app makes a call to random.org for 18 randomly generated bits (0s and 1s; 0s for yin, 1s for yang), and divides the 18 bits into an array of 6 bit arrays, each representing a line of the hexagram. The hexagram constituted by these arrays is rendered to the page; if a line is changing, it becomes its opposite in the transformed hexagram, denoted by a red line in the cast hexagram. 

random.org generates random numbers using atmospheric noise. In the case that random.org is down, the app generates the reading using a cryptographic pseudonumber generator.

## Why use it?

The I Ching is something hard to pin down. Most guides on using it tell you to have some specific issue in mind you'd like to address; and doing this certainly grants you new insight into the matter. But I've found it can also be very fruitful even when you have nothing in particular in your mind: often I find it's only when I have nothing specific of which to inquire that the oracle grants me an insight that is relevant to something that has been bothering me. Had I had something too premeditated on my mind, I would already know what I am inquiring about, rendering it futile to consult the I Ching. This is one motivation behind this instance of the I Ching; to quickly let the oracle inform you about something you might have been overlooking consciously.