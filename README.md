pass-extension
==============

Project overview:

Password generation extension. 

Capabilities:
=============

Generates a password based on a user-input master password, 
the current domain name(or a domain name specified by the user),
and a descriptor describing the limitations imposed on the password.


Implementation:
===============

The extension itself stores data locally, and generates a password 
from scratch every time a password is used.

When a password is generated, the descriptor used to generate it is 
stored locally and used to generate it the next time.


