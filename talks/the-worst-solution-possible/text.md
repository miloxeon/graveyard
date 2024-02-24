1.

Welcome to the "milo reading his incomprehensible articles that barely make sense" event,,, I'm glad you're all here, and I'm allowed to speak English. I'm autistic, so if my tempo is not right, or if I get carried away, please, be patient.

Disclaimer: This talk is about the web. The frontend, the backend — just the web.

2.

I think you all know the concept of glass cannon. It's a common pattern in RPG games when you just dump all the points you have into damage. You create the build that is one trick pony. It can one-shot everything because it's strong at dealing damage, but it can be one-shot by everyone because it's weak at everything else.

This is what I see in frameworks. They're usually built around one concept that is presented pompously, with everything else being a tradeoff.

It's not because people who make frameworks are stupid or something. Many of them are greater engineers than I can ever hope to be. I want to make the case that for any framework out there, it is impossible to avoid becoming a glass cannon.

3.

Let's start small. Strapi. Strapi is a typical headless CMS. Kinda like WordPress, but smaller and free of legacy. Instead of rendered pages, it returns JSON. It allows you to build entities with a mouse, and have endpoints generated.

4.

Advantage #1. The GUI for entities, one size fits all. A neat feature to get started quickly. We can have datatypes, we can have relations, and that's about it.

5.

Disadvantage: Admin panel doesn't fit all. You can't set up admin panel — everything is tables. What if you have images? When you create a row, relations is just an ugly select box that displays ID and not something meaningful, and you can't change it.

Disadvantage: Because Strapi focuses on the content, it has entities that aren't SQL primitives. This means we cannot have required relations, and that's a massive downside if you need general purpose REST backend.

So, Strapi is already too SQL-ish to be about content, but too content-ish to be about SQL.

6.

Advantage #2. Automated CRUD and GraphQL generation. It saves time to get started and attracts people because of it.

7.

Disadvantage: automated GraphQL on top of CRUD can never be performant. CRUD by definition selects all the fields there are, and, to have GraphQL sub-selection, you filter the data on the backend with JS, not with SQL. We're already going way slower than we can.

Disadvantage: GraphQL is typed. SQL is typed as well. Their types are not the same. This means sticking to primitives and having every relation optional. You have to write a lot of code that just checks for null. The work handled by SQL is now up to you.

8.

Advantage #2.5. The lifecycle. It's 2.5 and not 3 because the lifecycle is the obvious measure to have the one-size-fits-all API at least barely controllable.

9.

Disadvantage: this is disconnected from SQL. The validation is done with JS, but some validation still happens with SQL. Two sources of truth. Strapi introduces its "services" model that you cannot reliably use with JS validation, and you don't have the proper way to validate with SQL. This means importing your validation code manually every time, and, as it is JS doing SQL job, it is slow.

Disadvantage: as you're disconnected from SQL, you cannot have transactions and locks. It was a pain in the ass to integrate Stripe. Say you have the order entity that can be paid for or not. You initiate the payment with Stripe, and, because the entire thing is asynchronous, and you cannot bring synchronization in with SQL, you have absolutely no means to lock the order until Stripe webhook signal arrives. You can lock it, but you can't reliably unlock it if Stripe throws an error. You cannot resolve the concurrency.

Disadvantage: you cannot have the "create if not found" operation. If you do it, and you get two consecutive requests, both will check if there is an entity, both won't find it, and both will create a new one. And you don't have SQL to have your back.

10.

Let's recap. I installed Strapi. I created my entities, and I had CRUD generated. But to have good UI for editors, I have to write a custom plugin that is just a better admin panel. To integrate Stripe, I have to bring in some JS singleton or hack into the Strapi itself to have direct SQL access. To integrate any library, I must first consult with the lifecycle. And to have "create if not found", I had to use the atrocious blockchain-like hack that will store the ID of order N - 1 in the unique field of order N, so the duplicate orders will have the same ID there, and it will throw an error. I don't have migrations — I have to somehow hammer them in myself. The plugin system relies on NPM but not really, and plugin versions must exactly match, the framework is very complicated inside, so it only supports Node 14, and I cannot run multiple instances in parallel.

Building new features here is not like building them from scratch — it's like building them _for_ Strapi. If we account for everything, it will be much quicker in a long run to write from scratch.

Oh, and also the auth is JWT-only, and to have cookies, I had to copy some shady script from Strapi forum.

11.

How easy is that!
We have the glass cannon. Admin panel and CRUDs. Everything else is terrible.

It's very easy to say "Strapi is bad, we can do better". But it's always easy in hindsight when you judge the mistakes of others.

12.

GraphQL. Technically not a framework, but in reality, it is.

13.

Advantage #1: GraphQL is typed.

14.

Disadvantage: They are not like TypeScript, the main language used with GraphQL. They are not like SQL. They have Float and Int separate (given JS is the most popular language used with GraphQL). Also, InputObject and Object are the same in nature, but are different for GraphQL. They have a separate type for ID, and in theory, GraphQL is static, but nonetheless, Apollo still checks types in runtime.

15.

The best you have is Apollo Codegen which generates TS from GraphQL, and it is bad. The **generated** folder is created for every GraphQL query, and you have to import from them.

16.

Advantage #2: subselection over multiple endpoints. You can have many datastores, and if they have the correct interface, they will work.

17.

Disadvantage: the N+1 problem. GraphQL fundamentally cannot do things in one query, as datastores are not databases. For every subselection, there is a separate query. The separate query with JS. Bye-bye performance.

18.

but dataloader!

The official GraphQL solution. What GraphQL does to resolve this?

19.

They do it by "batching and caching"!
GraphQL just _waits_ for resolvers to load keys. Then, it combines DB calls into batches and then caches results.

Yeah, data will eventually be returned.

As we see, it's not a solution. The solution doesn't exist. In the database, data and queries work together, and this provides the performance and integrity GraphQL can never match. Can't have efficiency on datastores of this high level of abstraction.

GraphQL is not a proper query language. You have no joins. You have to do joins on your frontend. Yes, joins on the frontend. You make one query, get IDs, and then make another query.
I don't know if I have to say anything else.

20.

If you're not sure about GraphQL, don't be. It won't help you. It will ruin your performance. At the very best, if you cover every possible entity intersection with a custom resolver, the performance will be like the database, and you can have subselection from the frontend. Yes, all that code just to replace "\*" in "SELECT \* FROM".

Another glass cannon. If and only if you need to have multiple datastores that are different in their design, GraphQL can be justified. If you don't, it will ruin your project in the long run.

21.

Let's make this quick. Hadoop allows transformations on big data.

22.

Here's the article by Adam Drake [Command-line Tools can be 235x Faster than your Hadoop Cluster](https://adamdrake.com/command-line-tools-can-be-235x-faster-than-your-hadoop-cluster.html), where he replaces 26 minutes Hadoop with 12 seconds of shell code.

The good old glass cannon again. If and only if you need to crunch petabytes of data, the massive performance downside of Hadoop is justified. Because you have no choice. But if you do, you'll get the downsides without upsides.

23.

Let's talk about React. The main event for me. I use it for five years already.

24.

What's common about "free" products of huge companies? They're all for-profit. They are either made for collecting data, like FB Pixel, GA, Recaptcha, Google Fonts and Firebase, or for gaining leverage, like Chromium and Android. Huge companies never spend money "just because".

25.

React was created for this very reason. Let's design a tool that compiles into both web and mobile to cover the most ground possible. We need to make it easy to start with, so the majority of the projects will switch to our framework.

This was the plan. And of course, as mobile and web have nothing in common, a thick layer of abstraction was needed. You cannot make it work otherwise.

This is what they introduced:

26.

- Their own lifecycle

27.

- JSX, a syntax sugar to disguise function calls as if they were HTML

28.

- Their own components being "pure functions" that "efficiently re-render on state change".

29.

And yes, of course, they wanted to secure their position. This was the key point all along. They used "Facebook BSD+Patents License" which means if you use React, you can't sue Facebook.

30.

Oh, and also Jest, Immutable.js, our old friend GraphQL, Flow types, and basically the entire Facebook ecosystem has the same license. And they wanted you to use this ecosystem.

31.

On Jul 16, 2017, Apache banned React in all their projects, because they don't want the leverage Facebook had. Here's the incomplete list of companies who did the same:

32.

- Google
- Adobe
- LinkedIn
- WMware
- Jupyter

Yes, Google banned React.

33.

People weren't happy.

34.

I found a quote that puts it nicely:

> Open source should not rely on a patron's sympathy that can be revoked at any hint of conflict.

This license fiasco was the golden ticket for Vue and Preact to rise. Both had the MIT license.

I want you to understand the following: React never was a great idea. React never was an innovator. React didn't invent the frontend. React didn't make the frontend better. I was marketing all along.

React was an act to gain leverage. They needed it to compile into both web and mobile. And precisely this was the reason behind the "React Way Of Doing Things". It was never good. It was the necessary evil to cover both web and mobile.

React is the jack of all trades, master of none.

So, let's dissect React.

35.

"Advantage" number one — React Native. React compiles into both native and web.

Disadvantage: the lifecycle. It maybe _compiles_ into web, but it's _not_ web. The React lifecycle doesn't correspond to how web works.

Disadvantage: the "pure" functions. DOM has nothing to do with pure functions. It has no means to efficiently process pure functions. DOM doesn't re-render on every state change.

Disadvantage: going stateless. DOM is inherently stateful. You can't get around it. So, React invented hooks — the ad-hoc solution that is sugary enough to look simple. But it's complex in nature. If you want to work with the DOM, you have to spread your code across hooks, turning it into spaghetti.

Disadvantage: performance. In React 16, in a trivial web form at work, I used hooks, because you don't get to choose. The runtime of pressing one key to type one symbol was 22ms.
Meanwhile, on the server, a query along all the orders with one join took 17ms, on a free Heroku node. These things should not take the same time. I followed all the best practices. It didn't matter if I used one hook per field or just one hook. Both things were slow.

Disadvantage: virtual DOM. We already touched on its performance. It makes you think you can render lists quickly. But it's not the case. I worked for Openland in the past, the messenger app. We had React Native. So, to make it at least barely usable, we wrote custom views with Swift on iOS and Kotlin on Android. Only this helped us to render UI quick enough. Otherwise, it was unbearable.
But at this point, why did we even have to use React Native? React Native is a good idea if you remove the "React" part.

Voila, the glass cannon. One advantage — web and native in one box. Everything else is a tradeoff.

36.

This is the main problem. Frameworks are cruel. They bring a few upsides and a pile of downsides. The downsides hit you all at once. But for the upsides, you have to fight. If you absolutely need that one good thing, you can at least get something. But if you don't use it, you get bad things anyway.

The common theme is the lack of flexibility. There was a case with US Air Force in WWII that illustrates the problem. There were 10 body measurements made for every pilot. If you were taller than two meters, you couldn't be a pilot in the first place. When designing cockpits, the consensus was that most pilots will fit in the average measurements of all pilots.

But one researcher did his math. How many pilots really matched the average by all ten params. He was shocked. Here's how many pilots matched:

Zero.

Out of more than 4000 pilots, not a single one matched the average. There was no "average pilot". If you design a system to fit the most, it would fit no one. The system designed with the average in mind is doomed to fail.

37.

When you write in React, you write _for_ React to make it work, and not for _yourself_ to solve the actual task.

I always needed a react-specific version of everything. Do you want a modal? Look for react-modal. Do you want toast notifications? Look for react-toast-notifications.

The reason is React mixes with the web like oil and water. Yes, Facebook will lie to you about React being a library, and that it can be introduced later on, but you have to have an empty div called "react-root" where everything will live. You cannot "add React" to what you already have. There is no way to send data to React root and back without hacks, because React has its own lifecycle.

38.

!->>
I used Gatsby. Gatsby is a framework on top of React that pre-renders your React UI in compile-time and is a competitor to

39.

NextJS, which is also a framework on top of React, but it pre-renders your client-side React UI by running it on the server, but not just any server, the specific NextJS backend server, and Gatsby is a better choice, even though starter app with nothing in there builds in two solid minutes on my M1, because NextJS now have precisely 999 open issues, and fifteen pages worth of issues have no replies, because Vercel is too busy hammering in new features that barely work just to pitch to their investors.

Phew.

Gatsby was a terrible mistake. Builds were inconsistent, CSS didn't work properly, HMR was slow, and sometimes it just wouldn't load, because you know, !->>^^ it's React, pure functions, they are easy to replace and re-run because they have no side effects, and Erlang is like this for this exact reason!|... wait. Yeah. Didn't age well. Maybe they're "different kind" of pure functions.

40.

I also needed CSS. You have styled components, yeah, the thing that generates your CSS in runtime, and you have Linaria, the thing that generates CSS in build time. And Linaria had a Gatsby plugin that doesn't work on Netlify for some reason. And the unofficial plugin broke HMR for CSS. I needed to refresh the entire SPA every time I change CSS, and if you know me, you know I love CSS, and I write a lot of it.

41.

Then, I decided to speed up my HMR and move to Vite. Vite is a thing on top of esbuild that doesn't bundle files into a single script and relies on native ES imports instead. But Vite doesn't work with Linaria. The official Vite-Linaria plugin didn't work.

42.

There are two unofficial plugins. One is written properly, and another one is written poorly. One of the authors has an anime profile pic. Guess which is which.

Being the person I am, I looked at the second one's code and decided to go with the first one instead, and it was only because of the code, and totally not because of the avatar.

It didn't work.

But the anime one did.

I copied anime one's source code in my project, and... it didn't work now!

The reason was the package-lock. Anime code was indeed trash, but the lockfile had the precious combination of precise dependency versions, and this fragile balance was making it work.

43.

Now, my entire frontend stack was dependent on a single lockfile of the abandoned plugin that was poorly written by a person with an anime profile pic.

44.

The more code I wrote, the harder it became. At this point, I had three screens, but I only wrote code supporting the framework, without solving my actual tasks.

But Vite got me thinking. If the problem of bundling code that was notoriously hard, with code chunking black magic, was solved by native modules, what if I could go all native?

45.

In 30 minutes, I built a Gulp setup that just concatenated HTML and CSS. The JS part was just copied from src to dist without changes, and that JS was imported with script type="module".

30 minutes. I went without React, not even using web components, just template tags instead. I directly modified DOM with querySelectors. And on top of that, I built a different app with that three screens.

The code was small and efficient. The performance was better than with React. And this was the first time I met the frontend deadline. I didn't need HMR — the app reloaded faster than React with HMR. I didn't need SSR — the HTML wasn't generated by JS.

Gatsby, Vite, Linaria, HMR — outperformed by the simple Gulp setup.

46.

It almost seems like, with React, an emergent phenomenon arises. There is this thing about our universe called "emergence". If you have many dumb things interacting with each other, when you reach critical mass, the whole system gains a new property.

One water molecule cannot be dry or wet. But if you have billions of them together, the "wetness" emerges. This thing is universal and applies to absolutely everything.

It seems like this is what happens with React. Small bits of lifecycle-related code accumulate over time and emerge into the React-specific assembly. Hypothetically, your code can be in perfect order. But this system is compatible with neither web nor native. You have to use hacks like useEffect. They accumulate and ruin everything.

To paraphrase cat-v,

47.

react is like violence. Once you start using it, to every problem you have, the answer is always just more react.

48.

React had shot itself in the knee. Maybe they wanted the majority to adopt React quickly, and that would've changed the standards. Maybe they thought web components will never come out. I don't know. But the fact is, because of their license, the blitzkrieg didn't happen, and because of how DOM works, React was not compatible with web components from the very beginning.

As of React 17, React doesn't support web components. You technically can have them, but every single custom tag needs to be wrapped with React.

Web components, already long supported in all browsers, are now being used by Google in production. Even russian Yandex uses them.

Now, React 18 is out. There is still no web components support.

Facebook obviously has great engineers. But I think what they introduced in React early on, when the future of the web was uncertain, cannot be fixed now. I doubt React will ever support the modern web specs.

49.

So, React is not a future jQuery. As of 2022, jQuery is used on 70% of all websites. jQuery is a syntax sugar on top of DOM. It's a real library — you can add jQuery, and you can remove jQuery. It doesn't enforce the architecture, the lifecycle and approaches. It's just a library.

React is something else.

50.

Here's a riddle. What was

- super-hyped
- worked for both web and mobile
- had a big company behind it
- looked like the future when web wasn't advanced
- and also didn't mix well with the web?

51.

Yes.

React is the future Flash.

...

I always try to go deeper to understand something. Why certain things and certain people are the way they are. Some time ago, I created a picture that I think neatly summarizes the entire human progress.

52.

We create metaphors. They are much cheaper than going and trying everything in the material world. The most successful metaphors become common knowledge, and that thing, we call "culture". The purpose of the culture is to act as a distributed knowledge source, so our children don't need to reinvent the whole world for themselves.

Metaphors are important.

The saddest thing about React is the fact that virtual DOM is the purest metaphor I've seen in the frontend world.

Too bad it was ruined by the corporation that wanted leverage.

This is why every single open-source project made by Facebook failed: flow types, expo, flux, relay, immutable.js, react-native-web. Because they were not designed to be good solutions to their problems. They were designed to gain leverage.

53.

(read like "there is a hole at the bottom of math")

There is a gap between languages and libraries. Libraries are small, independent, and can be integrated with each other. Languages are big and expressive, and any modern language can make anything you need.

But there is a missing link. The link that tackles the chaos. The link that enforces structure.

Frameworks fill that gap. They do the architecture for you. If you can find the framework that is close to the architecture you want, you can use it.

But it only seems like it at the beginning. You write code that supports the business, and business changes. The business should adapt.

Frameworks are glass cannons. They excel at one thing and are bad at all the others. There is no flexible framework. It cannot exist because there is no ultimately flexible architecture, despite what Uncle Bob wants to sell you.

54.

No one knows your business better than you, and no one can build the architecture for it better than you. Frameworks have their own architecture. But it never changes. Your business, however, does change. Frameworks may provide the architecture for you, but they can never replace the architecture. If the framework is designed to suit all, it will suit no one.

55.

There is a gap between languages and libraries. But there is no gap frameworks can fill. Only you can create the architecture that fills it.

Those who don't use their framework's advantages still pay for the downsides. Those who use them, have no choice.

And for both of those people...

...frameworks might just be...

56.

...the worst solution possible.
