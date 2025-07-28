# Notes

Here is a list of things that I would have done given if I had more time:

## User Interface

- User Interface would've been improved via the following:

### Search Term

- Update the search term container section with improved spacing. A lot of whitespace and it's a bit too crammed. I would have increased the height of the search container and increased the padding

### Table

- Make the table rows look more like cards with better spacing and better font styling

---

## Code

- I would create a `Table` component that accepts the `filteredAdvocates` as a prop

```
// Table.tsx

interface Props {
    advocates: Advocate[]
}

export default function Table({advocates}: Props) {
    return (
        <table>
            {all the table elements}
        </table>
    )
}

// pages.tsx

import Table from './Table';

<Table advocates={filteredAdvocates} />

```

- I would create a `SearchTerm` component and move the searchTerm logic in it

```
// SearchTerm.tsx

interface Props {
    value: string;
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (evt: React.MouseEventHandler<HTMLButtonElement>) => void;
}

export default function SearchTerm({value, onChange}: Props) {
    return (
        <div className="search-term-container">
            {search term elements}
        </div>
    )
}

// pages.tsx

import SearchTerm from './SearchTerm'

<SearchTerm value={searchTerm} onChange={onChange} onClick={onClick} />
```

- I would have moved `return advocates.filter((advocate) => { ... }` into a helper function that could be tested with Vitest to ensure that we can pass in a searchTerm and it would return the correct length of results

## Nice to Haves

- Utilize Tanstack Query or Redux Toolkit Query to fetch API instead of `useEffect`
- Implement React Testing Library for component testing w/ Mock Service Worker for mocked data
