pass-extension
==============

Project overview:

Password generation extension. Does not store any passwords, only the 
information required to generate one.

Capabilities:
=============

Generates a password based on a user-input master password, 
the current domain name(or a domain name specified by the user),
and a descriptor describing the limitations imposed on the password.


Implementation:
===============

The extension itself only stores descriptors  locally, and generates a password 
from scratch every time a password is used.

When a password is generated, the descriptor used to generate it is 
stored locally and used to generate it the next time.


Detailed design and implementation plan:
========================================

Startup:
On page load, extension fetches the domain name and places it into url box if "auto" checkbox is 
checked. Extension looks up domain name in descriptor dictionary and loads the descriptor if exists.
Otherwise creates a new one. It also checks the appropriate boxes in the UI corresponding to 
descriptor contents.

UI:

Extension contains 4 text fields and 4 checkboxes. Checkboxes stand for the 4 default character sets
plus the custom set and fields are: Master password(obscured), domain name, salt, and custom.





