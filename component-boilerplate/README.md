# Component boilerplate
Simple and straightforward boilerplate that enables you to make components with zero configuration. Meant to be used with Brackets and Live Reload.

Feel free to use [Tachyons](http://tachyons.io/) for designing right in browser. Just uncomment the Tachyons import and go ahead.

## Requirements
 - Git
 - BEM

## Workflow
1. Fork this repo
2. Clone the forked repo
3. Open `index.html` in Brackets
4. Enable Live Reload
5. __Build component with BEM__. Feel free to adjust container as you need.
6. Create pull-request

## Guidelines
 - __Keep it mobile-first.__  
Open devtools and choose narrow viewport (around 500 px wide). Your component should not misbehave at any viewport width.

 - __Keep it BEM.__  
Separate BEM namespaces allows components to be truly independent and replaceable.

 - __Use 8-Point grid.__  
[8-Point grid](https://spec.fm/specifics/8-pt-grid) makes pixels look sharp and helps to preserve vertical rhythm.

## Structure
_(coming soon)_


## Showcase
Let's review the code of the sample component, step by step.

### Markup
```HTML
<div class="card">
    <h2 class="card__heading">Component boilerplate</h2>
    <p class="card__text">
        Good project begins with good boilerplate. This boilerplate exists to give you the environment that feels like home.
    </p>
    <button class="card__button card__button--monospace">
        Share
    </button>
</div>
```
As you may see, it's just pure BEM without any extraordinary things.


### Styling
First of all, let's take a look at how BEM elements' styles should be ordered:
```CSS
.card { /* Block goes first */ }

.card__heading { /* Elements are going next */ }
.card__text {  }

.card__button { /* Element's pseudo-classes goes before it's modifiers */ }
.card__button:hover,
.card__button:focus {  }
.card__button:active {  }

.card__button--monospace { /* Modifiers goes after the element but before pseudos */ }
```

In Sass and other preprocessors you may go nested:
```SCSS
.card {
  &__heading {  }
  /* and so on */
}
```
...but this boilerplate is all about _zero configuration_, so you may only use CSS.

Let's review the styling itself.  

#### Blocks
```CSS
.card {
    padding: 1rem;  /* 1 */
    border-radius: .5rem;  /* 1 */
    
    font-family: sans-serif;  /* 2 */
    background: linear-gradient(to bottom, #e8e8e8, #dddddd);
    
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .1);  /* 3 */
}
```
1. At our reset, we use `16px` as root font size. Please, use eight-pixel grid with REMs: `.5rem` is one grid point, `1rem` is two and so on.
2. If you use custom font family, declare it here, at block level.
3. Things like shadows doesn't affect the position of other elements, so you may not follow the grid here.

#### Elements
```CSS
.card__heading {
    margin-bottom: 1rem;  /* 1 */
}

.card__text {
    line-height: 1.25;  /* 2 */
    margin-bottom: 1rem;  /* 1 */
}
```
1. Our reset sets the default margins to zero, so you should choose them on your own. Use grid to keep it aligned to vertical rhythm.
2. Always fill the component with wrapping text and check how it wraps. Adjust `line-height` accordingly.

#### Pseudo-classes
```CSS
.card__button {
    padding: .5rem 1rem;
    border: none;
    border-radius: .5rem;  /* 1 */
    
    color: white;
    line-height: 1.25;
    
    background: hsl(198, 51%, 49%);  /* 2 */
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .1);  /* 3 */
    
    transition:
        background .1s linear,  /* 4 */
        box-shadow .1s linear;
}

.card__button:hover,
.card__button:focus {
    background: hsl(198, 51%, 56%);  /* 2 */
    box-shadow: 0 0 4px rgba(0, 0, 0, .3);
    
    outline: none;  /* 5 */
}

.card__button:active {
    background: hsl(198, 51%, 66%);  /* 2 */
    outline: none;  /* 5 */
}
```
1. _Any_ values (excluding only `line-height` and maybe `border-width`) should be measured in grid points.
2. When you make colors ligher or darker on some action, use HSL definitions. In HSL, you may only change one last value (`lightness`) to make the color darker or lighter.
3. Transparent shadow looks awesome.
4. _Never_ use `transition: all ...`. Always define transition properties explicitly.
5. Provide some visual difference when removing outlines.

_(to be continued)_
