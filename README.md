# wordleplus

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