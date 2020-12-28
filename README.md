# hello-action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.
Feat change

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: actions/hello-world-javascript-action@v1.1
with:
  who-to-greet: 'Mona the Octocat'


# cc by pr

This action validates PR Title.

## Inputs

## Example usage

- name: cc-by-pr
        id: cc-by-pr
        uses: ns8482e/hello-action/actions/ccbypr@v15
        with:
          env : {{ Secure }}

Updated read me
