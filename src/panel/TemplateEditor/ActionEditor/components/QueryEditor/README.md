

```mermaid
graph TD
    QueryEditor --> SelectorEditor
    QueryEditor --> AIAssistant
    SelectorEditor --> SelectorField
    SelectorEditor --> FunctionEditor
    QueryEditor --> RawQueryEditor
    QueryEditor --> QueryPager
    SelectorField --> SelectorOutput
    FunctionEditor --> functions.json
```

