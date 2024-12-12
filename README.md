<h1>Overview</h1>
<p>
This is a simple base line nodejs project that implements a http(s) server driven by an openapi specification.  The http server is based on axios and uses the openapi-backend library to connect the openapi specification to functionality.
<p>

<h2>Setup</h2>
<h3>Prerequisties</h2>
<p>You'll you need to have node, tsc, rimraf installed.</p?>


<code>
npm install
</code>

<code>
npm run build
</code>

<code>
npm run start --config config/application-config.json
</code>


<h2> HTTPS Certificate Set-up</h2>
To enable support for HTTPS you'll need to set up server certificates and then point to them from the index.ts file.

<code>
openssl genrsa -out key.pem
</code>

<code>
openssl req -new -key key.pem -out csr.pem
</code>

<code>
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
</code>