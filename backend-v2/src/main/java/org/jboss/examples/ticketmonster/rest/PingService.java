/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.jboss.examples.ticketmonster.rest;

import org.ff4j.FF4j;
import org.ff4j.core.Feature;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.Map;

/**
 * Created by ceposta 
 * <a href="http://christianposta.com/blog>http://christianposta.com/blog</a>.
 */
@Path("/ping")
@Stateless
public class PingService {
    @Inject
    FF4j ff;

    @GET
    public String ping(){
        StringBuilder sb = new StringBuilder("pong: ");

        Map<String, Feature> features = ff.getFeatures();

        for (Feature feature : features.values()) {
            if(feature.isEnable()){
                sb.append("[");
                sb.append(feature.getUid());
                sb.append("] ");
            }
        }
        return sb.toString() + " " + ff.getVersion();
    }
}
