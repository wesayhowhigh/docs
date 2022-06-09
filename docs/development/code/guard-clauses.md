---
sidebar_label: Guard Clauses
---

# Guard Clauses

:::note

This was totally nicked from the eBook [BaseCode](https://basecodefieldguide.com/) by Jason McCreary

:::


Nested code is often the result of logical progression. As programmers we write out each condition until we reach a level where it’s safe to perform the action.

While this flow may be ideal for execution, it’s not ideal for reading. For each nested level the reader has to maintain a growing mental model.

Consider the following implementation of the add method of a Set class:

```php showLineNumbers
public function add($item) {
    if ($item !== null) {
        if (!$this->contains($item)) {
            $this->items[] = $item;
        }
    }
}
```


Logically the progression: if the item is not null and if the Set does not contain the item, then add it.

The problem is not only the perceived complexity of such a simple action, but that the primary action of this code is buried at the deepest level.

Ideally the primary action of a block of code is at the top level. We can refactor the conditional to a guard clause to unravel the nested code and expose the primary action.

A guard clause simply protects our method from exceptional paths. Although they commonly appear at the top of a code block, they can appear anywhere. We can convert any nested conditional into a guard clause by applying De Morgan’s Laws and relinquishing control. In code, this means we negate the conditional and introduce a return statement.

By applying this to the add method our implementation becomes:

```php showLineNumbers
public function add($item) {
  if ($item === null || $this->contains($item)) {
      return;
  }

  $this->items[] = $item;
}
```


In doing so we have not only drawn out the primary action, but emphasized the exceptional paths for our method. It is now less complex for future readers to follow. It’s also easier to test as the exceptional paths are clearly drawn out.
