# wordleplus

https://wordleplus.onrender.com

Wordle expansion plans
What are we doing?
The plan is to create the variations of wordle and possibly other fun small games from the new york times minigames. I want to put all of this in one application and to log individual scores that may be pitted against other users. To bring out the competitive nature in people.

Why are we doing this?
This is obviously to strengthen my resume, but it’s also a passion that runs off my grade 12 addiction to new york time puzzles and wordles in my ICS class. It’s something that I’m actually interested in and that's what I need to fuel me when working on a project.

Which games will we include?
-Regular wordle
-Regular wordle (word length variations)
-Multiword wordles (Octordle, Quordle)
-Wordle but every time you get one right it adds a letter
-Wordle endless??
There’s many more that haven’t come to mind yet.

What will we use?
There are lots of questions about the architecture of this application. Is it going to be both a mobile and web application? What languages should we use? What backend database should we use?


Language and frameworks to use (based off chatGPT and research):

Full Stack web development
For web browser:
-React and typescript
-Node.js

Full Stack mobile development
For a mobile app:
-Flutter and dart 
-Node.js

Lowkey this is just a log of what I'm doing.

Oct 3, 2024:
Currently working on simply tranposing everything from HTML/CSS/JS to React/TSX.
Planning to implement other game modes before worrying about keeping data.

Feb 17, 2025:
Its been a while you know.. stuff happens but I'm back. It's time to lock in. I just finished all the extra stuff that make it feel more complete than my original version. 
-Valid word checking
-Actual word bank
Actually thats about it. But thats really important so you can't just type in some random stuff to clear out letters like aeiou is not a word but you get all the vowels.
-Homepage
-Routing to original game
Not really interested in styling just yet, functionality is more important. I'd like to work on making the backend so I can host individual users for this original game before I start making the variations like quordle and octordle. 

Feb 18th 2025:
I have added a backend to this app with Express.js and node.js and connected it to MongoDB. I have also dockerized the whole thing. Honestly not too sure what its going to do for me but now I can say I've used docker. I did troll with my db credentials but its ok I changed the password and hid it.

For my db structure, I'm thinking we have:

User: containing username, email, password, each gamemode statistics, friendlist (for multiplayer), account creation time/date.

Leaderboard: containing top statistics from each gamemode fetched from individual users

Games: containing multiplayer match session data, players involved, winner, stats, etc

GameLobby: containing players waiting, game status, word setup, gamemode, and this is all sent to a Games session once the game starts

For now though I'm only concerned with User and Leaderboard as its too early to think about multiplayer

Its about 9pm right now. I've added the signup logic and it adds the user to mongodb after a lot of headaches. Also put it on the frontend sign up button, its not styled but it works thats all I care about right now. Gotta learn how to create unique sessions now.. cooked.

Its 1am right now. Just got through the brain damage of trouble shooting token authentication and logout functionality. overcooked.
Need to figure out how to update docker in real time otherwise its just useless. Do that tomorrow with another white monster.

Feb 19th, 2025:
I've done so many little small things and bug fixes today but now everything actually works as intended. Token auth, logout, protecting the profile page, fetching data from backend. Ok but now that I can actually communicate with the backend on an account instance, its time to think about what kind of statistics I want to track from the game. And which to display for all users                     f

-Games played?
-Guess distribution
-Number of correct guesses
-Time? not now but in the future

Feb 20th, 2025:
I figured out which ones to display
Games played, games won, guess distribution, average number of guesses, current streak and longest streak. Then put games won, average number of guesses, and longest streak on a leaderboard because those are probably the most relevant. 
I have gotten them to be displayed through one window that you can cycle through to show each stat. Shows their rank, their username, and the stat itself. Right now its the top 10 players. I dont know if I should make it longer or shorter yet but we'll see. It's on its own page right now for testing but I want it to be displayed on the side of the game. I think after I put all that into place, I'm going to begin styling everything and make it look presentable and then that will be Version 1.0 of wordleplus. 

Actually I need to work on error responses and testing before styling oopsies.

Leaderboard is in the right position and updates properly. Thats it for today.

Feb 23rd, 2025:
Its been a few days, skiing took the piss outta me but we back. I'm fairly content with what I have right now in terms of functionality so next I want to actually deploy this where people can use it from their own machines. Then I'll do my least favourite thing which is styling.

Feb 27th, 2025:
So its on Render now, there are still a bug where you reload the page and it redirects to not found. I'm not sure how to fix that yet but it will happen sometime. All the other pages still aren't styled yet but that can happen later, I need to work on my portfolio website now since its pretty barren. Then I'll come back here once thats done.

Feb 28th, 2025:
God bless the random guy on youtube who had a fix to the problem.