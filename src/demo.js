import React, { Component } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

import Paper from "@material-ui/core/Paper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Alert from "@material-ui/lab/Alert";

import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import { MusicSubs, PaidSubs } from "./chart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  table: {
    minWidth: 650
  }
  // paper: {
  //   height: 140,
  //   width: 100
  // },
  // control: {
  //   padding: theme.spacing(2)
  // }
}));

function createData(item, amount, currency, scale) {
  return { item, amount, currency, scale };
}

const revenueRows = (subs2030, paidRev) => {
  return [
    createData("Paid Subscribers", subs2030, "", "m"),
    createData("Free Subscribers", subs2030 * 2, "", "m"),
    createData("Revenue per paid", paidRev, "$", ""),
    createData("Revenue per free", 4.2, "$", ""),
    createData("Paid Revenue", subs2030 * paidRev, "$", "m"),
    createData("Free Revenue", subs2030 * 2 * 4.2, "$", "m"),
    createData(
      "Total Revenue",
      subs2030 * paidRev + subs2030 * 2 * 4.2,
      "$",
      "m"
    )
  ];
};

const earningsRows = (subs2030, totalRev, growth) => {
  var grossProfit = totalRev * 0.25;
  var marketing = subs2030 * 6;
  var staff = 6000 * Math.pow((growth - 1) / 2 + 1, 10);
  var ga = (staff * 200000) / 1000000;
  var opex = marketing + ga;
  var ni = grossProfit - opex;
  return [
    createData("Gross Profit @ 25% margin", grossProfit, "$", "m"),
    createData("Marketing @ $6 per subscriber", marketing, "$", "m"),
    createData("Employee Count", staff, "", ""),
    createData("Total G&A and R&D", ga, "$", "m"),
    createData("Total Operating Expenses", opex, "$", "m"),
    createData("Net Profit", ni, "$", "m")
    //createData('Total Revenue', (subs2030 * paidRev) + (subs2030*2*4.2), "$", "m"),
  ];
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicMarketSize: "1.1",
      marketShare: 35,
      subs2030: 100,
      subPrice: "48"
    };
  }

  valueLabelFormat = (value) => {
    return `${value}%`;
  };

  subs2030Calc = (start, growth, share) => {
    return start * Math.pow(growth, 10) * (share / 100);
  };

  totalRev = (subs2030, paidRev) => {
    return subs2030 * paidRev + subs2030 * 2 * 4.2;
  };

  earningsCalc = (subs2030, totalRev, growth) => {
    var grossProfit = totalRev * 0.25;
    var marketing = subs2030 * 6;
    var staff = 6000 * Math.pow((growth - 1) / 2 + 1, 10);
    var ga = (staff * 200000) / 1000000;
    var opex = marketing + ga;
    return grossProfit - opex;
  };

  valueCalc = () => {
    return (
      40 *
      this.earningsCalc(
        this.subs2030Calc(
          450,
          this.state.musicMarketSize,
          this.state.marketShare
        ),
        this.totalRev(
          this.subs2030Calc(
            450,
            this.state.musicMarketSize,
            this.state.marketShare
          ),
          parseInt(this.state.subPrice)
        ),
        this.state.musicMarketSize
      )
    );
  };

  discountCalc = () => {
    return (this.valueCalc() / 190 - 265) / 265;
  };

  handleChange = (event, newValue) => {
    var stateUpdate = {};
    stateUpdate[
      event.target.name ? event.target.name : "marketShare"
    ] = newValue;
    //console.log(stateUpdate);
    this.setState(stateUpdate);
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="m" className={useStyles.root}>
          <Typography variant="h2" component="h2" gutterBottom>
            <img
              width="50"
              src="https://developer.spotify.com/assets/branding-guidelines/icon1@2x.png"
              alt=""
            />{" "}
            My Spotify Thesis
          </Typography>

          <Grid container spacing={3}>
            {/* //CARDS CARD CARDS CARDs */}
            <Grid item xs={12}>
              <Alert severity="info">
                Use this tool to make an informed decision whether to invest in
                Spotify
              </Alert>
            </Grid>

            <Grid item xs={6}>
              <Card className={useStyles.root}>
                <CardContent>
                  <br />
                  <br />
                  <Typography variant="h2" component="h2">
                    $265.15
                  </Typography>
                  <Typography
                    className={useStyles.pos}
                    color="textSecondary"
                    gutterBottom
                  >
                    Share Price Today
                  </Typography>
                  <Typography className={useStyles.pos} color="textSecondary">
                    $50bn Market Cap
                  </Typography>
                </CardContent>
                {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={useStyles.root}>
                <CardContent>
                  <Alert
                    severity={this.discountCalc() > 0 ? "success" : "error"}
                  >
                    {(this.discountCalc() * 100).toFixed(0)}%{" "}
                    {this.discountCalc() > 0 ? "Undervalued" : "Overvalued"}
                  </Alert>
                  <Typography variant="h2" component="h2">
                    ${(this.valueCalc() / 190).toFixed(0)}
                  </Typography>
                  <Typography
                    className={useStyles.pos}
                    color="textSecondary"
                    gutterBottom
                  >
                    Share Price in 2031
                  </Typography>
                  <Typography className={useStyles.pos} color="textSecondary">
                    ${(this.valueCalc() / 1000).toFixed(0)}
                    bn Market Cap
                  </Typography>
                </CardContent>
                {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
              </Card>
              <Tooltip title="A P/E ratio of 40x is used based on other established software companies with similar business models here is my relative valuation for Spotify.">
                <Button size="small">Learn More</Button>
              </Tooltip>
            </Grid>

            <Grid item xs={12}>
              <Alert severity={this.discountCalc() > 0 ? "success" : "error"}>
                Based on your thesis, Spotify would be a{" "}
                {this.discountCalc() > 0 ? "good" : "poor"} long term investment
              </Alert>
              <br />
              <Alert severity="info">
                Review the options below, remember there are no wrong answers 😋
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" component="h5" gutterBottom>
                Global Music Streaming Subscriptions
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography color="textSecondary">
                Currently 450 million people have a paid music subscription, 1
                in 15 people or 1 in 4 households which has been growing at an
                annual rate of 30% YoY.
                <br />
                <br />
                In 2031 years how many people will have a subscription:
              </Typography>

              <FormControl component="fieldset">
                <RadioGroup
                  name="musicMarketSize"
                  value={this.state.musicMarketSize}
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                    value="1.19"
                    control={<Radio />}
                    label="1.8b: 1 in 4 people (most households)"
                  />
                  <FormControlLabel
                    value="1.1"
                    control={<Radio />}
                    label="900m: 1 in 8 people (~45% households) "
                  />
                  <FormControlLabel
                    value="1.01"
                    control={<Radio />}
                    label="The same (450m)"
                  />
                </RadioGroup>
                <Typography className={useStyles.pos} color="textSecondary">
                  For context:
                  <ul>
                    <li>Global population is 7.5 bn</li>
                    <li>Expected to be 8.5 bn in 2030</li>
                  </ul>
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography
                className={useStyles.title}
                color="textSecondary"
                gutterBottom
              >
                Global Music Subscriptions
              </Typography>
              <br />
              <MusicSubs growth={this.state.musicMarketSize} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" component="h5" gutterBottom>
                Spotify Market Share
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography color="textSecondary">
                Spotify has 158 million paid subscribers, which is 35% of the
                market.
                <br />
                <br />
                In 10 years what will Spotify's market share be:
              </Typography>
              <br />
              <br />
              <Slider
                name="marketShare"
                value={this.state.marketShare}
                min={0}
                //step={1}
                max={100}
                valueLabelDisplay="on"
                valueLabelFormat={this.valueLabelFormat}
                onChange={this.handleChange}
              />
              <Typography className={useStyles.pos} color="textSecondary">
                For context:
                <ul>
                  <li>Apple music has 19%</li>
                  <li>Amazon has 15%</li>
                  <li>Tencent has 11%</li>
                  <li>YouTube has 6%</li>
                  <li>Others 14%</li>
                </ul>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                className={useStyles.title}
                color="textSecondary"
                gutterBottom
              >
                Spotify Premium Subscribers
              </Typography>
              <br />
              <PaidSubs
                growth={this.state.musicMarketSize}
                share={this.state.marketShare}
                subs2030={this.subs2030Calc(
                  450,
                  this.state.musicMarketSize,
                  this.state.marketShare
                )}
              />
            </Grid>

            {/* PRICE per sub!! */}
            <Grid item xs={12}>
              <Typography variant="h5" component="h5" gutterBottom>
                Cost of a Premium Subscription
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography color="textSecondary">
                  Today Spotify charges on average $48 per year for a Premium
                  subscription.
                  <br />
                  <br />
                  In 2031:
                </Typography>
                <RadioGroup
                  name="subPrice"
                  value={this.state.subPrice}
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                    value="60"
                    control={<Radio />}
                    label="Spotify will be able to increase their average annual subscription cost to $60 by 2031."
                  />
                  <FormControlLabel
                    value="48"
                    control={<Radio />}
                    label="Spotify will be able to increase their average annual subscription and this will still be around the $48 mark in 2031."
                  />
                  <FormControlLabel
                    value="40"
                    control={<Radio />}
                    label="Spotify will actually have to cut their average annual subscription cost to $40 to remain competitive."
                  />
                </RadioGroup>
                <Typography className={useStyles.pos} color="textSecondary">
                  For context the cost of a annual Spotify plan by region:
                  <ul>
                    <li> Europe $180</li>
                    <li> North America $120</li>
                    <li>Africa $60</li>
                    <li> Latin $60</li>
                    <li> India $19</li>
                  </ul>
                </Typography>
              </FormControl>
            </Grid>

            {/* //CARDS CARD CARDS CARDs */}
            <Grid item xs={12}>
              <Typography variant="h5" component="h5" gutterBottom>
                Summary of your inputs
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Card className={useStyles.root}>
                <CardContent>
                  <Typography
                    className={useStyles.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Paid Subscribers in 2031
                  </Typography>
                  <Typography variant="h2" component="h2">
                    {this.subs2030Calc(
                      450,
                      this.state.musicMarketSize,
                      this.state.marketShare
                    ).toFixed(0)}
                  </Typography>
                  <Typography className={useStyles.pos} color="textSecondary">
                    million
                  </Typography>
                </CardContent>
                {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={useStyles.root}>
                <CardContent>
                  <Typography
                    className={useStyles.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Revenue per subscriber
                  </Typography>
                  <Typography variant="h2" component="h2">
                    ${this.state.subPrice}
                  </Typography>
                  <Typography className={useStyles.pos} color="textSecondary">
                    per year
                  </Typography>
                </CardContent>
                {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
              </Card>
            </Grid>

            {/* THE CALCAS */}

            <Grid item xs={12}>
              <Typography variant="h5" component="h5" gutterBottom>
                The Calculations
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TableContainer component={Paper}>
                <Table
                  className={useStyles.table}
                  size="small"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Revenue</TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {revenueRows(
                      this.subs2030Calc(
                        450,
                        this.state.musicMarketSize,
                        this.state.marketShare
                      ),
                      parseInt(this.state.subPrice)
                    ).map((row) => (
                      <TableRow key={row.item}>
                        <TableCell component="th" scope="row">
                          {row.item}
                        </TableCell>
                        <TableCell align="right">
                          {row.currency}
                          {row.amount.toFixed(0)}
                        </TableCell>
                        <TableCell>{row.scale}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={6}>
              <TableContainer component={Paper}>
                <Table
                  className={useStyles.table}
                  size="small"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Earnings</TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {earningsRows(
                      this.subs2030Calc(
                        450,
                        this.state.musicMarketSize,
                        this.state.marketShare
                      ),
                      this.totalRev(
                        this.subs2030Calc(
                          450,
                          this.state.musicMarketSize,
                          this.state.marketShare
                        ),
                        parseInt(this.state.subPrice)
                      ),
                      this.state.musicMarketSize
                    ).map((row) => (
                      <TableRow key={row.item}>
                        <TableCell component="th" scope="row">
                          {row.item}
                        </TableCell>
                        <TableCell align="right">
                          {row.currency}
                          {row.amount.toFixed(0)}
                        </TableCell>
                        <TableCell>{row.scale}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
