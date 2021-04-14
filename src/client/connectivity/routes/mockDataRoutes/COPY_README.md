# Copy

## Structure of copy objects
We only want 1 level deep objects for route copy and 2 level deep objects for globals

### Route specific copy
##### OK
```
const sv_HomeRoute = {
  mainTitle: 'Startsidans Title',
  subTitle:
    'Detta ${1} är vår ända dynamiska text formatering för simpel copy.',
};
```
##### NOT OK
```
const sv_HomeRoute = {
  someObject: {
    // NOT OK
    title: 'NOT OK',
  },
};
```

### Global copy
##### OK
```
const sv_globals = {
  mainNavbar: {
    logoUrl: 'https://picsum.photos/50/50',
    title: 'replace_me',
  },
  footer: {
    title: 'replace_me',
  },
};
```
##### NOT OK
```
const sv_globals = {
  mainNavbar: {
    logoUrl: 'https://picsum.photos/50/50',
    title: 'replace_me',
    someObject: {
      // NOT OK
      title: 'NOT OK',
    },
  },
  footer: {
    title: 'replace_me',
  },
};
```

## Basic formatting 
To make it easy for editors to injects a dynamic value in a string
we have a `copyFormatter` function that is used like this:
 `copyFormatter(homeCopy.mainTitle, 'Dynamic Value')` this
allows the editors to write copy like this: 
- `mainTitle: 'Welcome ${1}, this is your dashboard'` where `${1}`
    could be a name retrieved from an API.
- Without such formatting one would have to create two keys: 
    mainTitlePrefix and mainTitleSuffix for the editor to fill in
    which isnt that user friendly.
