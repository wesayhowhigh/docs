---
sidebar_position: 5
sidebar_label: List Types
---

# List Types

These are custom list types you can use in your `columns.yaml` files

## Money

`type: money`

Renders a `Money\Money` class object as a string: e.g. `£3.00`

```yaml title="columns.yaml"
columns:
  cost:
    label: Cost
    // highlight-next-line
    type: money
    searchable: false
    sortable: false
```
