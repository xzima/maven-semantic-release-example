/*
 * Copyright © 2022 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.evansiroky;

import org.junit.Before;
import org.junit.Test;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import static org.hamcrest.core.StringContains.containsString;
import static org.junit.Assert.assertThat;

/**
 * Test for the app.
 */
public class AppTest {
    private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();

    /**
     * setup a stream to capture the output from the program
     */
    @Before
    public void setUpStreams() {
        System.setOut(new PrintStream(outContent));
    }

    /**
     * Make sure that "Hello World!" string can be printed.
     *
     * @throws Exception
     */
    @Test
    public void canPrintHelp() throws Exception {
        String[] args = {"-help"};
        App.main(args);
        assertThat(outContent.toString(), containsString("Hello World!"));
    }
}
