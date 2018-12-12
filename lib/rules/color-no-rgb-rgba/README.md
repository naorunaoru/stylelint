# color-no-rgb-rgba

Disallow rgb and rgba colors.

```css
a {
  color: rgba(255, 255, 255, 0.1);
}

a {
  color: rgb(127, 127, 127);
}
/**        ↑
 * These rgba colors */
```

## Options

### `true`

The following patterns are considered violations:

```css
a {
  color: rgb(0, 0, 0);
}
```

```css
a {
  color: rgba(0, 0, 0, 1);
}
```

Values that are not valid also cause violations:

```css
a {
  color: rgb(0, 0, 0, 355);
}
```

```css
a {
  color: rgba(0, 0, 999);
}
```

The following patterns are _not_ considered violations:

```css
a {
  color: black;
}
```

```css
a {
  color: #000;
}
```

```css
a {
  color: #fff1aa;
}
```

```css
a {
  color: #123456aa;
}
```
