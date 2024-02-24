# How I helped 500,000 people

1.
Welcome to Milo being a preacher yet again. If you like what I do, oh you're in for a treat. Everything is here: talking about death, shameless bragging, sermons, speculations; the things you know me for. Let's go.

2.
I once came across the xkcd that stuck with me. Or, maybe it wasn't an xkcd, but it doesn't matter. I don't remember the source, but I remember the message. It goes like this:

3.
"The year is 2050. Not a single line of code you've ever written is in use."

It got me thinking. What would be a counter-example to this? GCC? Vim? Or, maybe Git? While I could come with counterexamples that said the author of that line was wrong, I later realized this was merely my defence. The defence against the realization of me being a loser, with the entire body of my work being obsolete even before I die.

4.
I make small open-source libraries. Even before I started making them, I was preaching one simple thought: whatever you do should have the lowest entry barrier possible. And I did just that.

Here is my library called fast-image-zoom. What it does is you add one script to your page, and suddenly, when you click on any image you have, it smoothly zooms in, like on Medium platform. I did a good job making sure it's performant. It only uses two listeners, so the performance doesn't change whether you have two images or two thousand, and it uses math to do the zooming in just one efficient CSS transition.

5.
It was the first library I made that got GitHub issues and people's feedback. And goddamn I want those GitHub stars.

6.
But my projects are not popular, to say the least.

Not popular, except for one particular project.

7.
Alpine-curl-bash. A container with - you guessed it, — Alpine Linux, curl and bash.

8.
It has more than 500,000 downloads.

9.
I created it as a part of Bizongroup — the laughably unprofessional startup that never took off. I was the only engineer there, earning 500 dollars a month. I can't even say I was a CTO. Not with this kind of company. I was the code guy. I had no contract, nothing. It wasn't even a real company. I got my salary wired to my personal banking card back then. I was a student.

10.
But what is it? It's a container that solves a very specific, ugly problem. To do my things with Docker, I needed some bare-bones image that is capable of spinning up other stuff. To deploy a lot of other tools, you need a Linux container, you pull stuff with curl, and then you launch it with bash. I wrote it in minutes, slapped a name on it, and moved on to do my actual tasks.

I mentioned ugly problems. It's a point that is often brought up when discussing popularity. So let's bring it up once again.

11.
PHP.

Nuff said, isn't it? Is it ugly? Yes. Is it popular? Massively so.

12.
As of today, PHP is the most popular language for the backend. So, maybe we can learn something? Let's analyse the mindset behind PHP.

13.
...let's unpack this.

14.
"I don't know how to stop it, there was never any intent to write a programming language. I have absolutely no idea how to write a programming language, I just kept adding the next logical step on the way."

15.
"Ugly problems often require ugly solutions. Solving an ugly problem in a pure manner is bloody hard."

16.
"We have things like protected properties. We have abstract methods. We have all this stuff that your computer science teacher told you you shouldn't be using. I don't care about this crap at all."

17.
"I'm not a real programmer. I throw together things until it works, then I move on. The real programmers will say "Yeah it works but you're leaking memory everywhere. Perhaps we should fix that." I'll just restart Apache every 10 requests."

18.
"There are people who actually like programming. I don't understand why they like programming. I actually hate programming."

19.
"Back when PHP had less than 100 functions and the function hashing mechanism was strlen()"

20.
"Yes. I am a terrible coder. but I am probably still better than you :)"

...

21. (smiley face slide)
To me, this sounds almost offensive. My heart is in pain when I read it. Yet, here I am, some hipster with 26 GitHub stars on the project that barely exists, that no one cares about, and PHP is being used on 77% of all the websites out there. Yes, Rasmus talks about the early days of PHP. Yes, Rasmus is not the only person working on PHP right now. Yes, they fixed a lot of things in PHP later on. But the point is, they fixed it _because it had traction_, and not the other way around. If it wasn't popular from the get-go, there would've been no one to fix it.

Let's move on to an even more popular project. The one that basically solved everything for the entire niche, destroying every competitor it had along the way.

22.
Git.

Git is absolutely, undoubtedly, the single version control system out there. It has no competition, and, as long as the code is the text, it never will. A subproject of Linux, designed quickly to help building Linux itself, made it to the number one version control system out there.

23.
Now, it's used not just by the coders, but by designers, writers, and everyone who was tired enough of naming files "Final", "Final 2", "Final 2 (1)", and "Final 2 (1) definitely final".

Git is a software developer's scalpel. If you never heard about git, and you get paid to do software, you probably don't exist.

24.
Git was made by Linus Torvalds, the creator of Linux. Do you want to know the difference between Git and PHP? It's simple: The difference between Rasmus Lerdorf and Linus Torvalds is that Rasmus Lerdorf is not Linus Torvalds. Linus is much, _much_ better at making software.

25.
"I decided I can write something better than anything out there in two weeks, and I was right."

...

26.
Let's examine another project. jQuery.

27. (jquery meme)
jQuery is the most popular library for the frontend. Simple as that. Back in the day, when web platform was much less developed, jQuery allowed basically anyone to make something meaningful on the web. Since then, the web had moved on, but people didn't. Jam-packed with features, as of 2022, jQuery is being used at 70% of the websites out there.

28.
If we rank the creators of the three popular things, we get this picture:

1. Linus Torvalds (Git)
2. John Resig (jQuery)
3. Rasmus Lerdorf (PHP)

29.
or, more like this: (gap between linus and the rest)

It seems like the skill has no bearing on impact and popularity. Nevertheless, there is a common theme here: no matter who you are, no matter your skillset, no matter what you're building and what other people say about your proficiency, jQuery was for you. PHP was for you. Git was for you.

30.
They included people. And inclusive system always wins.

31.
So, to make this kind of impact, you have to design a solution that:
- Solves a very specific problem, specific enough to be a perfect fit. The larger the scope, the less are your chances.
- Requires literally nothing to integrate and use. Low entry barrier, no prerequisites, nothing.
- Should be transparent. Should have no flavour. Should mix with anything.

32. (grim mode starts)
Back to my project. I barely remembered it existed until I accidentally visited Dockerhub. First, it was like "wow, look at the numbers". I was proud of myself for a moment.

But somehow, I felt like... something was off. Somehow, I felt uneasy. I thought of it from time to time, and the eerie feeling wouldn't go away.

33. (code)
I made this project without any effort. I made it in minutes, barely thinking about the design. For many people now, it was a no-brainer when they chose the container for their job, but, ironically, it was a no-brainer for me as well when I was making it. But somehow, it turned out to be relevant and useful to a lot of people.

I have no memories about writing it. I barely remembered it existed. It took me years to rediscover my own abandoned project.

This code. Has more than half of a million downloads. Among an obscene amount of other utilitarian containers, to many people, this one was the best. It solved a specific problem, and did it well.

My preaches of low entry barrier were relevant. Everything I fought for was there, but it didn't seem... intentional?

If fast-image-zoom was my child, alpine-curl-bash was just my kid I abandoned. An orphan turned out to be famous and successful. More than that, if I _designed_ alpine-curl-bash to be better, it wouldn't have been so popular. I would ruin it with my design.

34.
Over the course of eleven years, I thought of one hundred and twenty-three projects. Sixty of them were made and launched. But alpine-curl-bash was the only one that people really use on a daily basis.

35. (sad emoji)
alpine-curl-bash was a profound but haunting experience I wasn't ready for. Of everything I made, if something is going to last, it would be alpine-curl-bash. Everything else will be lost to the time, leaving no trace. Remember, if you're 50, and your code is not in use anymore — you're a loser. The formula we learned with PHP can slightly increase your chances, but that's about it. Honestly, statistically speaking, your project will never take off. You're not gonna make it.

But...

36.
Should you?

37.
Yes, if people use your code forever, it means you made an impact.
But, does impact really mean people using your code forever?
Is it possible to make an impact without anyone using your code?

38.
This is REFAL. Some obscure programming language centred around supercompilation. I have no idea what this means, probably something related to functional programming, with the level of abstraction being high into outer space.

No one is using it. Really. Let's be serious for a moment.

39.
But look at the website. I mean, just look at it. The gradient. The logos. The sheer maximalism. This is some alien level stuff. It shouldn't exist, yet it does.

Now, I want to try it. Just for fun. When I look at this website, I feel the _presence_. I feel like I'm contemplating some ancient beauty. Unique, obscure, yet absolutely majestic. !!!!!!!40 SEAMLESS!!!!!. I feel like I'm contemplating something sublime. Like I gaze into something eternal and infinite.

41.
I love esoteric languages.

42.
No, not brainfuck. This is too obvious and too distasteful.

43.
My favourite one so far is Piet.

Inspired by the paintings of Piet Mondrian, a Piet program is an image. You code in pixels rather than symbols. Rather than typing code, you _paint_ in code.

44.
I don't understand it. I never learned it. Yet, I probably will, because it's just so goddamn beautiful. Especially, finishing a program and looking at the end result, all at once. Small square, precisely painted, with not a single square left to a random chance.

I told you maximalism was bad, because should have I applied to alpine-curl-bash, I would've ruined it. But now, maximalism is good, and, matter of fact, it's the only option.

45.
I asked you whether the impact means people using your code forever. Well, probably, the answer is no. I don't want to work under this. It shouldn't be this utilitarian.

Instead, to me, impact is beauty.

46.
This is the throne of James Hampton, a homeless schizophrenic man who lived in the fifties thinking he had to make it for the second advent, so jesus and the saints coming to earth for the second time had the throne room. He spent more than ten years building it tirelessly.

47.
The entire thing is made from trash. Pieces of glass, lightbulbs and shreds of cardboard carefully wrapped with cigarette pack tinfoil to make them look like gold. The symmetry is perfect.

48.
When you look at it, technically, you're looking at the literal trash. But, people who had seen it in person reported being alert and mesmerized. They felt the presence. The beauty. They felt like they weren't looking at some trash put together, but at something fundamental and sublime.

Inspired by the throne, the outsider avant-garde art scene came up with the definition of art. Yes, not the only one out there, but the one I like the most, because it's so neat and simple.

49.
If the result itself is the enough of a reward for the artist, it's art. If it's not, it's not.

So, if you feel the need and the purpose to create your dream maximalist masterpiece of a project, and you're okay with no one using it, because the project itself is the ultimate reward, you're making true art.

Your real impact is immeasurable. Both Refal and Piet creators have no idea they made an impact on me. I talked about death. Well, if your project is the ultimate masterpiece that you deemed perfect, that you said everything you wanted to say, people _will_ notice. They _will_ feel the presence. Your project will be accidentally rediscovered again and again after you die.

50.
This phenomenon has the name. It's called queer culture. Queer not meaning LGBT, but rather meaning being a misfit. This is the most neatly put with Haiku OS.

51.
"Haiku os is a queer operating system. Our work will never define the future of operating systems, but what it [does do] is undermine the monotone machinery of the competition. It is in this niche we can operate the best. Because even though we have no future, it does not mean that there will not arrive one eventually. Let us get there in the most pleasant way possible."

...

52.
Your body emits photons. They are scattered around, going in straight lines in all directions. When you die, the photons your body emitted will still be there. And, given how things are distributed in the outer space, it might be the case that those photons will never really stop, going in the straight lines forever.

Impact is more than code usage. You can never understand the impact you really have. Your project may never become the next big thing. It may never become the norm.

53.
But you will love it.
