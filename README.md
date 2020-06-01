# Draphony's React App Template

## Writing React Components

### Use Fragments instead of \<div>-Containers
```javascript
    class Columns extends React.Component {
        render() {
            return (
                <>
                    <td>Hello</td>
                    <td>World</td>
                </>
            );
        }
    }
```
You can also use the long version ```React.Fragment``` instead of ```<>``` if you need to specify properties such as ```keys```.

## TypeScript

### Conditional Declarations
```javascript
    export type Type = 
    { cancelled: false } 
    | {
        cancelled: true;
        uri: string; 
    }
```

