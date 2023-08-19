---
'@raddix/use-count-down': patch
---

Fixed execution of onFinished (it never got to execute when the countdown reached 0)

Fixed execution of reset (doesn't start again from initialValue)
