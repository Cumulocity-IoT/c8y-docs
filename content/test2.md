OPC UA gateway with the thin-edge.io proxy support
Description
The OPC UA gateway now connects to Cumulocity through the local Cumulocity thin-edge.io proxy.
Consequently, OPC UA gateway thin-edge.io usage without the Cumulocity proxy is now deprecated and will be removed in a future version.
Please update your gateway configuration to use this local proxy model corresponding to our revised documentation.
Cumulocity OpenAPI Specification :
I am attempting send queries and receive responses from my LwM2M devices registered with cumulocity by using the public API.
Specifically, I would like to perform operations such as “READ 1/0/1” “WRITE 3/0/3” etc
These operations are available from the “Shell” sidebar link when selecting an LwM2M device in my account, but I need to be able to do this in an automated fashion for my testing.

I am aware of the interactive
cumulocity API browser
(Forum will not allow me to link to a cumulocity page?!)
But I see nothing there that supports sending requests I am currently using the shell (manually) for.