# Custom pagination component

Example:

```

<pagination-component scope-key="events"
                      max-visible-tabs="maxVisibleTabs"
                      min-tab-width="30%"
                      current-page="tabToFocus"
                      type="scrollable"
                      include-icons="event.sport"
                      tab-text-key="groupName"
></pagination-component>

```

## Static attribute values:

Required:
- type - used as `type="scrollable"` in DOM, defines whether the tabs are scrollable or not. Leaving the value empty sets the tabs fixed
- includeIcons - used as `include-icons="event.sport""` in DOM, points to the value which will be used as icon name, eg: event.sport could return an icon called 'football'
- tabTextKey - used as `tab-text-key="groupName"` in DOM, points to the value which will serve as tab text

Optional:
- minTabWidth - used as `min-tab-width="30%"` in DOM, sets a minimum width on the tab item

## Dynamic attribute values:

Required:
- currentPage - used as `current-page="tabToFocus"` in DOM, takes an integer in order to set default focused tab at launch
- scopeKey - used as `scope-key="events"` in DOM, points to the array which will be iterated
- maxVisibleTabs - used as `max-visible-tabs="maxVisibleTabs"` in DOM, takes in an integer which defines how many tabs are visible


