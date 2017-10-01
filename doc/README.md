Documentation
=============
Expanded documentation for the `readme-md-cli` project.

Project Level Configuration
---------------------------
Project specific configuration is stored in `.config/readme-md.yml` file
relative to your project root. Given that `$PROJECT` represents the path to a
project then an absolute path representation would be
`$PROJECT/.config/readme-md.yml`.

Parameters are defined via the following properties:

### `see-also`
Enables and defines the contents of a "See Also" section positioned at the `-1`
section index. An object consisting of `<link text>: <target uri>` key/value
pairs e.g. _(`Example: http://www.example.org/`)_.

Given the following config:

```yml
see-also:
  Example: http://www.example.org/
  IETF: https://www.ietf.org/
```

The following section markup will be output:

```md
See Also
--------
- [Example](http://www.example.org/)
- [IETF](https://www.ietf.org/)
```

Reference
---------
- [YAML Spec](http://www.yaml.org/spec/1.2/spec.html)
