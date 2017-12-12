To apply a theme you can either wrap your root react app component in a `<ThemeProvider theme='[themeName]'>` wrapper component, or provide a theme to individual components via the `theme` prop. The `ThemeProvider` wrapper provides the supplied theme to any components underneath it. See [styled-components Theming](https://www.styled-components.com/docs/advanced#theming).

<pre>
import { ThemeProvider } from 'styled-components';

...
render(
	&lt;ThemeProvider theme={theme}&gt;
		&lt;MyComponentOrApp /&gt;
	&lt;/ThemeProvider&gt;
);
...
</pre>

Three themes are provided with this library: `defaultTheme`, `wtwTheme`, and `viaTheme`.

To create your own theme, you could simply copy one of the themes (a simple javascript object), modify the values, and supply that object to the `ThemeProvider`.

### Theme colors

<table style="margin-bottom: 1.5em">
	<tr><th colspan="7" style="text-align: left">Default</th></tr>
	<tr>
		<td>Primary <div style="background-color: #495057; padding: 1em; width: 50px"></div></td>
		<td>Accent <div style="background-color: #007bff; padding: 1em; width: 50px"></div></td>
		<td>Info <div style="background-color: #17a2b8; padding: 1em; width: 50px"></div></td>
		<td>Advisor <div style="background-color: #007bff; padding: 1em; width: 50px"></div></td>
		<td>Success <div style="background-color: #28a745; padding: 1em; width: 50px"></div></td>
		<td>Warning <div style="background-color: #ffc107; padding: 1em; width: 50px"></div></td>
		<td>Danger <div style="background-color: #dc3545; padding: 1em; width: 50px"></div></td>
	</tr>
</table>

<table style="margin-bottom: 1.5em">
	<tr><th colspan="7" style="text-align: left">WTW</th></tr>
	<tr>
		<td>Primary <div style="background-color: #000; padding: 1em; width: 50px"></div></td>
		<td>Accent <div style="background-color: #5a0c6f; padding: 1em; width: 50px"></div></td>
		<td>Info <div style="background-color: #1b6284; padding: 1em; width: 50px"></div></td>
		<td>Advisor <div style="background-color: #ff6310; padding: 1em; width: 50px"></div></td>
		<td>Success <div style="background-color: #060; padding: 1em; width: 50px"></div></td>
		<td>Warning <div style="background-color: #ebaf00; padding: 1em; width: 50px"></div></td>
		<td>Danger <div style="background-color: #af140c; padding: 1em; width: 50px"></div></td>
	</tr>
</table>

<table style="margin-bottom: 1.5em">
	<tr><th colspan="7" style="text-align: left">Via</th></tr>
	<tr>
		<td>Primary <div style="background-color: #007fa7; padding: 1em; width: 50px"></div></td>
		<td>Accent <div style="background-color: #00a0d2; padding: 1em; width: 50px"></div></td>
		<td>Info <div style="background-color: #069; padding: 1em; width: 50px"></div></td>
		<td>Advisor <div style="background-color: #b35f00; padding: 1em; width: 50px"></div></td>
		<td>Success <div style="background-color: #298544; padding: 1em; width: 50px"></div></td>
		<td>Warning <div style="background-color: #b35f00; padding: 1em; width: 50px"></div></td>
		<td>Danger <div style="background-color: #c00; padding: 1em; width: 50px"></div></td>
	</tr>
</table>

### Fonts

Apart from the icon set, this library does not have a specific typography and should work with whatever font you have defined in your project.